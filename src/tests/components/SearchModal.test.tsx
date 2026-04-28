import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { SearchModal } from '@/components/features/search/SearchModal';
import { contentRegistry } from '@/configurations/registry';
import { setupFetchMock } from '../mocks/fetch';
import { render, screen } from './test-utils';

const mockPush = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const renderSearchModal = (open = true) => {
  const onOpenChange = vi.fn();
  render(<SearchModal open={open} onOpenChange={onOpenChange} />);
};

describe('SearchModal', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    setupFetchMock({ scenario: 'success' });
    user = userEvent.setup();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Component States', () => {
    it('shows initial prompt when query is empty', async () => {
      renderSearchModal();

      expect(screen.getByText('輸入文字或者粵拼開始搜尋')).toBeInTheDocument();
    });

    it('shows loading state while fetch is pending', async () => {
      setupFetchMock({ scenario: 'loading' });
      renderSearchModal();

      await user.type(
        screen.getByPlaceholderText('搜尋文字或粵拼...'),
        'testing',
      );

      expect(screen.getByText('搜尋中...')).toBeInTheDocument();
    });

    it('shows error state when fetch fails', async () => {
      setupFetchMock({ scenario: 'network-error' });
      renderSearchModal();

      await user.type(
        screen.getByPlaceholderText('搜尋文字或粵拼...'),
        'testing',
      );

      expect(screen.getByText('搜尋失敗，遲啲再試下。')).toBeInTheDocument();
    });

    it('shows no results state when query matches nothing', async () => {
      setupFetchMock({ scenario: 'empty' });
      renderSearchModal();

      await user.type(
        screen.getByPlaceholderText('搜尋文字或粵拼...'),
        'testing',
      );

      expect(screen.getByText('揾唔到任何嘢')).toBeInTheDocument();
    });
  });

  describe('Text Search', () => {
    it('returns results with matching text', async () => {
      renderSearchModal();

      await user.type(screen.getByPlaceholderText('搜尋文字或粵拼...'), '冇');

      expect(
        screen.getByRole('option', { name: /阿茂整餅/ }),
      ).toBeInTheDocument(); // 冇嗰樣整嗰樣
      expect(
        screen.getByRole('option', { name: /賣魚佬沖涼/ }),
      ).toBeInTheDocument(); // 冇聲氣
      expect(
        screen.queryByRole('option', { name: /啞仔食黃蓮/ }),
      ).not.toBeInTheDocument();
    });
  });

  describe('Jyutping Search', () => {
    it('returns results for jyutping prefix match', async () => {
      renderSearchModal();

      await user.type(screen.getByPlaceholderText('搜尋文字或粵拼...'), 'aa2');

      expect(
        screen.getByRole('option', { name: /啞仔食黃蓮/ }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('option', { name: /阿茂整餅/ }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('option', { name: /賣魚佬沖涼/ }),
      ).not.toBeInTheDocument();
    });

    it('returns results for jyutping prefix match without tones', async () => {
      renderSearchModal();

      await user.type(screen.getByPlaceholderText('搜尋文字或粵拼...'), 'aa');

      expect(
        screen.getByRole('option', { name: /啞仔食黃蓮/ }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('option', { name: /阿茂整餅/ }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('option', { name: /賣魚佬沖涼/ }),
      ).not.toBeInTheDocument();
    });

    it('does not return results for infix jyutping match', async () => {
      renderSearchModal();

      const input = screen.getByPlaceholderText('搜尋文字或粵拼...');
      await user.type(input, 'a2'); // 'a2' can't match 'aa2

      expect(screen.getByText('揾唔到任何嘢')).toBeInTheDocument();
    });

    it('returns results for multi-syllable jyutping prefix', async () => {
      renderSearchModal();

      await user.type(
        screen.getByPlaceholderText('搜尋文字或粵拼...'),
        'aa2 zai2',
      );

      expect(
        screen.getByRole('option', { name: /啞仔食黃蓮/ }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('option', { name: /阿茂整餅/ }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('option', { name: /賣魚佬沖涼/ }),
      ).not.toBeInTheDocument();
    });

    it('matches jyutping in the middle of the string', async () => {
      renderSearchModal();

      await user.type(
        screen.getByPlaceholderText('搜尋文字或粵拼...'),
        'cung1 loeng4',
      );

      expect(
        screen.getByRole('option', { name: /賣魚佬沖涼/ }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('option', { name: /啞仔食黃蓮/ }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('option', { name: /阿茂整餅/ }),
      ).not.toBeInTheDocument();
    });

    it('matches jyutping for multiple entries in the results', async () => {
      renderSearchModal();

      await user.type(screen.getByPlaceholderText('搜尋文字或粵拼...'), 'mou5');

      expect(
        screen.getByRole('option', { name: /阿茂整餅/ }),
      ).toBeInTheDocument(); // 冇嗰樣整嗰樣
      expect(
        screen.getByRole('option', { name: /賣魚佬沖涼/ }),
      ).toBeInTheDocument(); // 冇聲氣
      expect(
        screen.queryByRole('option', { name: /啞仔食黃蓮/ }),
      ).not.toBeInTheDocument();
    });
  });

  describe('Scope Filtering', () => {
    it('shows scope selector with "全部" as default', () => {
      renderSearchModal();

      const trigger = screen.getByRole('combobox', { name: '搜尋範圍' });
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent('全部');
    });

    it('shows the content type labels as scope option', async () => {
      renderSearchModal();

      await user.click(screen.getByRole('combobox', { name: '搜尋範圍' }));

      for (const { label } of Object.values(contentRegistry)) {
        expect(
          await screen.findByRole('option', { name: label }),
        ).toBeInTheDocument();
      }
    });
  });

  describe('Navigation', () => {
    it('calls router.push with correct path when a result is selected', async () => {
      renderSearchModal();

      await user.type(
        screen.getByPlaceholderText('搜尋文字或粵拼...'),
        '啞仔食黃蓮',
      );
      await user.click(screen.getByRole('option', { name: /啞仔食黃蓮/ }));

      expect(mockPush).toHaveBeenCalledWith('/idioms/啞仔食黃蓮');
    });

    it('navigates to the correct path for a different result', async () => {
      renderSearchModal();

      await user.type(
        screen.getByPlaceholderText('搜尋文字或粵拼...'),
        '阿茂整餅',
      );
      await user.click(screen.getByRole('option', { name: /阿茂整餅/ }));

      expect(mockPush).toHaveBeenCalledWith('/idioms/阿茂整餅');
    });
  });

  describe('Accessibility', () => {
    it('focuses the search input on open', () => {
      renderSearchModal();

      expect(screen.getByPlaceholderText('搜尋文字或粵拼...')).toHaveFocus();
    });

    it('marks the result list as aria-busy while loading', async () => {
      setupFetchMock({ scenario: 'loading' });
      renderSearchModal();

      await user.type(
        screen.getByPlaceholderText('搜尋文字或粵拼...'),
        'testing',
      );

      expect(screen.getByRole('listbox')).toHaveAttribute('aria-busy', 'true');
    });
  });
});
