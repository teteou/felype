import contacts from "@/content/global/contacts.json";
import footerEs from "@/content/global/es/footer.json";
import headerEs from "@/content/global/es/header.json";
import seoEs from "@/content/global/es/seo.json";
import footerPt from "@/content/global/pt/footer.json";
import headerPt from "@/content/global/pt/header.json";
import seoPt from "@/content/global/pt/seo.json";

import style from "@/content/global/style.json";
import widget from "@/content/global/widget.json";
import { defaultLocale, locales } from "site.config";

const settings: Record<string, LocalizedSettings> = {
	es: {
		header: headerEs,
		footer: footerEs,
		contacts: contacts,
		seo: seoEs,
		style: style,
		widget: widget,
	},
	pt: {
		header: headerPt,
		footer: footerPt,
		contacts: contacts,
		seo: seoPt,
		style: style,
		widget: widget,
	},
};

export function getLocalizedSettings(locale?: string): LocalizedSettings {
	return settings[locale ?? defaultLocale] ?? settings[defaultLocale];
}

export function isLocalizedUrl(url: string): boolean {
	const urlParts = url.split("/");
	const firstPart = urlParts[1];
	return locales.includes(firstPart);
}

export function unlocalizedUrl(url: string): string {
	if (isLocalizedUrl(url)) {
		const urlParts = url.split("/").filter((part) => part !== "");
		// Remove the locale part
		urlParts.shift();
		// Rejoin the parts and ensure a leading slash
		const unlocalizedPath = `/${urlParts.join("/")}`;
		return unlocalizedPath === "//" ? "/" : unlocalizedPath;
	}
	return url;
}

export function translatePath(l: string, path: string) {
	return l === defaultLocale ? path : `/${l}${path}`;
}
