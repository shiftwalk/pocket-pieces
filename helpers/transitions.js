export const fade = {
	initial: { opacity: 0, filter: 'blur(70px)', },
  enter: { 
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.88, ease: [0.83, 0, 0.17, 1] }
  },
	exit: {
    opacity: 0,
    filter: 'blur(70px)',
		transition: { duration: 0.88, ease: [0.83, 0, 0.17, 1] }
	}
}