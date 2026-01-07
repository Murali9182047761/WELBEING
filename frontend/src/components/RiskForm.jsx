import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

const RiskForm = ({ onPrediction }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        Age: 25,
        Gender: 'Male',
        Work_Screen_Time: 6,
        Social_Media_Hours: 2,
        Gaming_Hours: 1,
        Sleep_Hours: 7,
        Physical_Activity_Hours: 1
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            onPrediction(data, formData);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to get prediction. Ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h3 className="text-xl font-semibold mb-6">Daily Habits Assessment</h3>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="input-group">
                        <label className="input-label">Age</label>
                        <input
                            type="number" name="Age"
                            value={formData.Age} onChange={handleChange}
                            className="input-field" min="10" max="100" required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Gender</label>
                        <select
                            name="Gender"
                            value={formData.Gender} onChange={handleChange}
                            className="input-field"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="input-group">
                    <label className="input-label">Work/Study Screen Time (Hours)</label>
                    <input
                        type="number" step="0.5" name="Work_Screen_Time"
                        value={formData.Work_Screen_Time} onChange={handleChange}
                        className="input-field" min="0" max="24" required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="input-group">
                        <label className="input-label">Social Media (Hours)</label>
                        <input
                            type="number" step="0.5" name="Social_Media_Hours"
                            value={formData.Social_Media_Hours} onChange={handleChange}
                            className="input-field" min="0" max="24" required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Gaming (Hours)</label>
                        <input
                            type="number" step="0.5" name="Gaming_Hours"
                            value={formData.Gaming_Hours} onChange={handleChange}
                            className="input-field" min="0" max="24" required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="input-group">
                        <label className="input-label">Sleep Duration (Hours)</label>
                        <input
                            type="number" step="0.5" name="Sleep_Hours"
                            value={formData.Sleep_Hours} onChange={handleChange}
                            className="input-field" min="0" max="24" required
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Physical Activity (Hours)</label>
                        <input
                            type="number" step="0.5" name="Physical_Activity_Hours"
                            value={formData.Physical_Activity_Hours} onChange={handleChange}
                            className="input-field" min="0" max="24" required
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary w-full flex justify-center items-center gap-2" disabled={loading}>
                    {loading && <Loader2 className="animate-spin w-4 h-4" />}
                    {loading ? 'Analyzing...' : 'Analyze Risk'}
                </button>
            </form>
        </div>
    );
};

export default RiskForm;
