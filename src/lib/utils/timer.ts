function zeroPadded(n: number) {
	return n >= 10 ? n.toString() : `0${n}`;
}

export function formatTime(ms: number) {
	const mm = zeroPadded(Math.floor(ms / 1000 / 60));
	const ss = zeroPadded(Math.floor(ms / 1000) % 60);
	return `${mm}:${ss}`;
}
