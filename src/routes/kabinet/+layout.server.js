import { fetchStrapiAPI } from '$lib/strapi';
import { getStrapiMedia } from '$lib/strapi';

export async function load() {
	const urlParamsObject = {
		populate: ['favicon', 'header.headerLogo.logoImage']
	};
	const vehParamsObject = {
		fields: ['model', 'data'] 
	};
	const globals = await fetchStrapiAPI('/global', urlParamsObject);
	const faviconUrl = await getStrapiMedia(globals.attributes.favicon.data?.attributes.url);
	const logoUrl = await getStrapiMedia(
		globals.attributes.header.headerLogo.logoImage.data?.attributes.url
	);
	const vehs = await fetchStrapiAPI('/vehs', vehParamsObject);
	//const foto = await getStrapiMedia(vehs.attributes?.foto.data?.attributes.url);

	return {
		faviconUrl,
		
		vehs
	};
}
