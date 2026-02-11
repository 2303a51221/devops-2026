import './UserGuidance.css';

function UserGuidance() {
    const tips = [
        {
            icon: '📚',
            title: 'Browse Courses',
            description: 'Explore our catalog and find courses that match your interests.'
        },
        {
            icon: '📝',
            title: 'Enroll & Learn',
            description: 'Sign up for courses and access video lessons and resources.'
        },
        {
            icon: '🏆',
            title: 'Earn Certificates',
            description: 'Complete courses and earn certificates to showcase your skills.'
        }
    ];

    return (
        <section className="guidance-section">
            <h2>Getting Started</h2>
            <div className="tips-container">
                {tips.map((tip, index) => (
                    <div key={index} className="tip-card">
                        <span className="tip-icon">{tip.icon}</span>
                        <h3>{tip.title}</h3>
                        <p>{tip.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default UserGuidance;
