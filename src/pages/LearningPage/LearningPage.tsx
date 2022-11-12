export default function LearningPage({ frameId, locale }: { frameId: string; locale: string }) {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <iframe style={{ width: '100%', height: '100%', border: 'none' }} src={`https://sol-a1.esls.io/${locale}/${frameId}`} title='learning' />
        </div>
    );
}
