'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CoachDetail from '../../_components/coaches-detail';

function CoachDetailPage() {
  const { id } = useParams();
  const [coachData, setCoachData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/coaches/api/${id}`);
        const data = await response.json();
        setCoachData(data);
        setLoading(false);
      } catch (err) {
        setError('無法載入教練資料');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCoachData();
  }, [id]);

  if (loading) return <div>載入中...</div>;
  if (error) return <div>{error}</div>;
  if (!coachData) return <div>找不到教練資料</div>;

  return (
    <>
      <CoachDetail {...coachData} />
    </>
  );
}

export default CoachDetailPage;
