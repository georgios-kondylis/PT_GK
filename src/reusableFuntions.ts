// Screen width utilities
export const maxSM = () => window.innerWidth < 770;
export const maxMD = () => window.innerWidth < 1000;
export const maxLG = () => window.innerWidth >= 1024;

export const scrollUp = () => {
 window.scrollTo({
   top: 0,
   behavior: 'smooth' // You can remove this line if you want instant scroll
 });
};