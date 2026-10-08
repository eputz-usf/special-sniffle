import {
  Backpack,
  Cpu,
  GraduationCap,
  University,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userSessionStore } from '../utils/userSession';
import type { UserTypeOption } from '../types/user';
import { userTypeOptions } from '../utils/userTypes';

function SelectUserType() {
  const navigate = useNavigate();

  async function handleUserTypeSelection(userType: UserTypeOption) {
    await userSessionStore.saveUserType(userType.id);
    navigate(userType.dashboardRoute);
  }

  return (
    <main className="user-select-page">
      <h1>Select User Group</h1>
      <p>Choose the group that best fits you to explore relevant degrees and resources.</p>
      <section>
        <ul className="user-type-list">
          {userTypeOptions.map((userType) => (
            <li key={userType.id}>
              <button
                className="user-type-card"
                type="button"
                onClick={() => handleUserTypeSelection(userType)}
              >
                <span
                  className={`user-type-logo${
                    userType.icon || userType.logoSrc ? ' has-visual' : ''
                  }`}
                  aria-hidden={!userType.logoSrc}
                >
                  {userType.icon === 'backpack' && (
                    <Backpack className="user-type-icon" aria-hidden="true" />
                  )}
                  {userType.icon === 'graduation-cap' && (
                    <GraduationCap
                      className="user-type-icon graduation-cap-icon"
                      aria-hidden="true"
                    />
                  )}
                  {userType.icon === 'cpu' && (
                    <Cpu className="user-type-icon" aria-hidden="true" />
                  )}
                  {userType.icon === 'university' && (
                    <University className="user-type-icon" aria-hidden="true" />
                  )}
                  {userType.logoSrc && (
                    <img src={userType.logoSrc} alt={userType.logoAlt ?? ''} />
                  )}
                </span>
                <span>{userType.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default SelectUserType;
