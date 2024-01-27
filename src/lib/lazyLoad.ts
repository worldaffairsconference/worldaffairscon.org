interface LazyLoadOptions {
	root?: Element | null;
	rootMargin?: string;
	threshold?: number | number[];
}

export const lazyLoad = (image: HTMLImageElement, src: string) => {
	const loaded = (): void => {
		image.style.opacity = "1";
	};

	const options: LazyLoadOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 0
	};

	const observer = new IntersectionObserver(
		(entries: IntersectionObserverEntry[]) => {
			if (entries[0]?.isIntersecting) {
				console.log("image loaded", src);
				image.src = src;
				if (image.complete) {
					loaded();
				} else {
					image.addEventListener("load", loaded);
				}
			}
		},
		options
	);

	observer.observe(image);

	return {
		destroy() {
			image.removeEventListener("load", loaded);
		}
	};
};
