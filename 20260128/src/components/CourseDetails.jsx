import './CourseDetails.css';

function CourseDetails() {
    const courses = [
        {
            id: 1,
            title: 'React Fundamentals',
            description: 'Learn the basics of React including components, props, and state.',
            duration: '4 weeks',
            level: 'Beginner'
        },
        {
            id: 2,
            title: 'Advanced JavaScript',
            description: 'Master ES6+, async programming, and modern JS patterns.',
            duration: '6 weeks',
            level: 'Intermediate'
        },
        {
            id: 3,
            title: 'Full Stack Development',
            description: 'Build complete web applications with React and Node.js.',
            duration: '8 weeks',
            level: 'Advanced'
        }
    ];

    return (
        <section className="courses-section">
            <h2>Available Courses</h2>
            <div className="courses-grid">
                {courses.map((course) => (
                    <div key={course.id} className="course-card">
                        <span className={`level-badge ${course.level.toLowerCase()}`}>
                            {course.level}
                        </span>
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                        <div className="course-meta">
                            <span>⏱️ {course.duration}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CourseDetails;
