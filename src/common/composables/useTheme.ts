import { useCookies } from '@vueuse/integrations/useCookies';
import { computed, readonly, ref, watch } from 'vue';

import { envs } from '@/config';
import { ThemeType } from '../types';

export function useTheme() {
	const cookies = useCookies(['theme']);
	const theme = ref<ThemeType | null>(cookies.get('theme'));

	const getPreferredTheme = () => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		return mediaQuery.matches ? ThemeType.Dark : ThemeType.Light;
	};

	watch(
		theme,
		(newTheme) => {
			if (!newTheme) newTheme = getPreferredTheme();

			cookies.set('theme', newTheme, {
				maxAge: 60 * 60 * 24 * 365,
				path: '/',
				secure: !envs.isDev,
				sameSite: 'lax',
			});
			document.documentElement.classList.toggle(
				'app-dark',
				newTheme === ThemeType.Dark,
			);
		},
		{ immediate: true },
	);

	return {
		theme: readonly(theme),
		setTheme: (value: ThemeType) => (theme.value = value),
		toggle: () =>
			(theme.value =
				theme.value === ThemeType.Light ? ThemeType.Dark : ThemeType.Light),
		isDarkMode: computed(() => theme.value === ThemeType.Dark),
	};
}
