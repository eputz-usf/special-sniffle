import { useNavigate } from 'react-router-dom';
import { saveUserType } from '../utils/auth';
import type { UserTypeOption } from '../types/user';
import { userTypeOptions } from '../utils/userTypes';

function SelectUserType() {
  const navigate = useNavigate();

  async function handleUserTypeSelection(userType: UserTypeOption) {
    await saveUserType(userType.id);
    navigate(userType.dashboardRoute);
  }

  return (
    <main>
      <h1>Select User Group</h1>
      <p>
        First-time users will select the group that best matches them. This
        will be saved to their account for future dashboard routing.
      </p>

      <section>
        <h2>Available User Groups</h2>
        <ul className="user-type-list">
          {userTypeOptions.map((userType) => (
            <li key={userType.id}>
              <button
                type="button"
                onClick={() => handleUserTypeSelection(userType)}
              >
                {userType.label}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default SelectUserType;
