export default function withTracker(WrappedComponent, options = {}) {
    const trackPage = (page) => {
        window.gtag('send', 'page_view', {
            page_location: window.location.href,
            page_path: window.location.pathname            
        });
    };
}