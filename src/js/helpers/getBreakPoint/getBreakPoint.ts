export const getBreakPoint = (breakpoint: string): string => {
  const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
    '3xl': '1920px'
  };
  return breakpoints[breakpoint as keyof typeof breakpoints];
};