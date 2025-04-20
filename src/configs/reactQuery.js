const defaultOptions = {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        experimental_prefetchInRender: true,
        retry: 1,
        staleTime: 60 * 1000,
    },
};

export default defaultOptions;