import type { CollectionEntry } from "astro:content";

export function sortMDByDate(posts: CollectionEntry<"post">[] = []) {
	return posts.sort((a, b) => {
		const aDate = new Date(a.data.updatedDate ?? a.data.publishDate).valueOf();
		const bDate = new Date(b.data.updatedDate ?? b.data.publishDate).valueOf();
		return bDate - aDate;
	});
}

export function getUniqueTags(posts: CollectionEntry<"post">[] = []) {
	const uniqueTags = new Set<string>();
	posts.forEach((post) => {
		post.data.tags.map((tag) => uniqueTags.add(tag));
	});
	return Array.from(uniqueTags);
}

export function getUniqueTagsWithCount(posts: CollectionEntry<"post">[] = []): {
	[key: string]: number;
} {
	return posts.reduce((prev, post) => {
		const runningTags: { [key: string]: number } = { ...prev };
		post.data.tags.forEach((tag) => {
			runningTags[tag] = (runningTags[tag] || 0) + 1;
		});
		return runningTags;
	}, {});
}

/** URL-safe slug for a tag, e.g. "game engine" -> "game-engine" */
export function getTagSlug(tag: string) {
	return tag
		.toLowerCase()
		.trim()
		.replace(/[^\p{L}\p{N}]+/gu, "-")
		.replace(/^-+|-+$/g, "");
}
