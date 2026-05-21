import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserType } from '../types/user';
import { getSavedUserType } from '../utils/auth';
import { getDashboardRoute, userTypeOptions } from '../utils/userTypes';

function Profile() {
  const navigate = useNavigate();
  const [savedUserType, setSavedUserType] = useState<UserType | null>(null);
  const selectedUserGroup = userTypeOptions.find(
    (option) => option.id === savedUserType,
  );
  const dashboardRoute = savedUserType ? getDashboardRoute(savedUserType) : '';

  useEffect(() => {
    async function loadProfile() {
      setSavedUserType(await getSavedUserType());
    }

    loadProfile();
  }, []);

  return (
    <main className="profile-page">
      <section className="profile-card">
        <p className="profile-eyebrow">USF login confirmed</p>
        <h1>User Profile</h1>

        {selectedUserGroup ? (
          <>
            <p>
              Your app profile is connected to this user group. This will be
              used to personalize your dashboard and recommendations.
            </p>

            <div className="profile-detail">
              <span>User group</span>
              <strong>{selectedUserGroup.label}</strong>
            </div>

            <div className="profile-actions">
              <button
                type="button"
                onClick={() => dashboardRoute && navigate(dashboardRoute)}
              >
                Continue to dashboard
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => navigate('/select-user-type')}
              >
                Change user group
              </button>
            </div>
          </>
        ) : (
          <>
            <p>
              No app profile has been created yet. Select your user group so
              the platform can route you to the right dashboard later.
            </p>

            <button type="button" onClick={() => navigate('/select-user-type')}>
              Create profile
            </button>
          </>
        )}
      </section>
    </main>
  );
}

export default Profile;
