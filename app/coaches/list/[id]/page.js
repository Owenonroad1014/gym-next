'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CoachDetail from '../../_components/coaches-detail';
import { COACHES_ITEM_GET } from '@/config/api-path';
import loaderStyle from '@/app/_components/_styles/loading.module.css';

function CoachDetailPage() {
  const { id } = useParams();
  const [coachData, setCoachData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${COACHES_ITEM_GET}/${id}`);
        const { data } = await response.json();

        const formattedData = {
          avatar: data.avatar,
          name: data.name,
          title: data.title,
          email: data.email,
          phone: data.phone,
          skill: data.skill,
          socialMedia: {
            facebook: data.socialMedia?.find(sm => sm.platform === 'facebook')?.url || '',
            instagram: data.socialMedia?.find(sm => sm.platform === 'instagram')?.url || '',
            twitter: data.socialMedia?.find(sm => sm.platform === 'twitter')?.url || '',
            linkedin: data.socialMedia?.find(sm => sm.platform === 'linkedin')?.url || ''
          },
          description: data.description,
          certifications: data.certifications?.map(cert => cert.certification)
        };
        console.log('Formatted data:', formattedData);
        
        setCoachData(formattedData);
        setLoading(false);
      } catch (err) {
        setError('無法載入教練資料');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCoachData();
  }, [id]);

  if (loading) return  <div className={loaderStyle.container}><div className={loaderStyle.loader}></div></div>;
  if (error) return <div>{error}</div>;
  if (!coachData) return <div>找不到教練資料</div>;



  return (
    <>
      <CoachDetail {...coachData}/>
    </>
  );
}

export default CoachDetailPage;
