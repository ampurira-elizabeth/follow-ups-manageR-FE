import React, { useState, useEffect } from 'react';
import api from '../services/api';

const FollowUpList = ({ leadId }) => {
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    const fetchFollowUps = async () => {
      const response = await api.get(`/leads/${leadId}/followups`);
      setFollowUps(response.data.followUps);
    };
    fetchFollowUps();
  }, [leadId]);

  return (
    <div>
      <h3>Follow-Ups</h3>
      <ul className="list-group">
        {followUps.map((followUp) => (
          <li key={followUp.id} className="list-group-item">
            Scheduled: {followUp.scheduled_at} - Status: {followUp.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowUpList;
