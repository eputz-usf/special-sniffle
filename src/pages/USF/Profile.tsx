import { type ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  FileText,
  Printer,
  RotateCcw,
  Save,
} from 'lucide-react';
import type { UserType } from '../../types/user';
import { getSavedUserType } from '../../utils/auth';
import { getDashboardRoute, userTypeOptions } from '../../utils/userTypes';
import {
  loadCurrentUsfProfileMajors,
  removeCurrentUsfProfileMajor,
  saveCurrentUsfProfileMajors,
  type CurrentUsfProfileMajor,
} from '../../utils/currentUsfProfileMajors';
import { getOrCreateCurrentUsfProfileSession } from '../../utils/currentUsfProfileSession';
import {
  loadRemoteCurrentUsfProfile,
  type CurrentUsfProfilePayload,
  upsertRemoteCurrentUsfProfile,
} from '../../utils/currentUsfProfileSupabase';
import '../../styles/degrees.css';
import '../../styles/highSchoolDashboard.css';
import '../../styles/transferPlanner.css';

const CURRENT_USF_PROFILE_STORAGE_KEY = 'cic_current_usf_profile';

const emptyProfile: CurrentUsfProfilePayload = {
  studentName: '',
  uNumber: '',
  usfEmail: '',
  currentCollege: '',
  currentMajor: '',
  yearStarted: '',
  classStanding: '',
  completedCredits: '',
  notes: '',
  questions: '',
};

function loadCurrentUsfProfile(): CurrentUsfProfilePayload {
  const savedProfile = window.localStorage.getItem(CURRENT_USF_PROFILE_STORAGE_KEY);

  if (savedProfile) {
    try {
      const parsedProfile = JSON.parse(savedProfile) as Partial<CurrentUsfProfilePayload>;

      return {
        studentName: parsedProfile.studentName ?? '',
        uNumber: parsedProfile.uNumber ?? '',
        usfEmail: parsedProfile.usfEmail ?? '',
        currentCollege: parsedProfile.currentCollege ?? '',
        currentMajor: parsedProfile.currentMajor ?? '',
        yearStarted: parsedProfile.yearStarted ?? '',
        classStanding: parsedProfile.classStanding ?? '',
        completedCredits: parsedProfile.completedCredits ?? '',
        notes: parsedProfile.notes ?? '',
        questions: parsedProfile.questions ?? '',
      };
    } catch {
      window.localStorage.removeItem(CURRENT_USF_PROFILE_STORAGE_KEY);
    }
  }

  return emptyProfile;
}

function mergeProfileMajors(
  localMajors: CurrentUsfProfileMajor[],
  remoteMajors: CurrentUsfProfileMajor[],
) {
  const mergedMajors = [...remoteMajors];
  const mergedMajorSlugs = new Set(remoteMajors.map((major) => major.slug));

  localMajors.forEach((major) => {
    if (!mergedMajorSlugs.has(major.slug)) {
      mergedMajors.push(major);
    }
  });

  return mergedMajors;
}

function Profile() {
  const navigate = useNavigate();
  const [profileSession] = useState(getOrCreateCurrentUsfProfileSession);
  const [savedUserType, setSavedUserType] = useState<UserType | null>(null);
  const [profile, setProfile] = useState(loadCurrentUsfProfile);
  const [savedProfileMajors, setSavedProfileMajors] = useState(() =>
    loadCurrentUsfProfileMajors(),
  );
  const [hasLoadedRemoteProfile, setHasLoadedRemoteProfile] = useState(false);
  const [profileSaveStatus, setProfileSaveStatus] = useState<
    'loading' | 'saved' | 'local-only' | 'error'
  >('loading');
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
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

  useEffect(() => {
    window.localStorage.setItem(
      CURRENT_USF_PROFILE_STORAGE_KEY,
      JSON.stringify(profile),
    );
  }, [profile]);

  useEffect(() => {
    let isMounted = true;

    async function hydrateRemoteProfile() {
      try {
        const remoteProfile = await loadRemoteCurrentUsfProfile(
          profileSession.sessionId,
        );

        if (!isMounted) {
          return;
        }

        if (remoteProfile) {
          setProfile({
            studentName: remoteProfile.profile.studentName ?? '',
            uNumber: remoteProfile.profile.uNumber ?? '',
            usfEmail: remoteProfile.profile.usfEmail ?? '',
            currentCollege: remoteProfile.profile.currentCollege ?? '',
            currentMajor: remoteProfile.profile.currentMajor ?? '',
            yearStarted: remoteProfile.profile.yearStarted ?? '',
            classStanding: remoteProfile.profile.classStanding ?? '',
            completedCredits: remoteProfile.profile.completedCredits ?? '',
            notes: remoteProfile.profile.notes ?? '',
            questions: remoteProfile.profile.questions ?? '',
          });
          const mergedMajors = mergeProfileMajors(
            loadCurrentUsfProfileMajors(),
            remoteProfile.majors,
          );

          setSavedProfileMajors(mergedMajors);
          saveCurrentUsfProfileMajors(mergedMajors);
          setProfileSaveStatus('saved');
        } else {
          setProfileSaveStatus('local-only');
        }
      } catch {
        if (isMounted) {
          setProfileSaveStatus('error');
        }
      } finally {
        if (isMounted) {
          setHasLoadedRemoteProfile(true);
        }
      }
    }

    hydrateRemoteProfile();

    return () => {
      isMounted = false;
    };
  }, [profileSession.sessionId]);

  useEffect(() => {
    if (!hasLoadedRemoteProfile) {
      return;
    }

    let isMounted = true;

    async function saveRemoteProfile() {
      try {
        const status = await upsertRemoteCurrentUsfProfile({
          sessionId: profileSession.sessionId,
          profile,
          majors: savedProfileMajors,
        });

        if (isMounted) {
          setProfileSaveStatus(status === 'saved' ? 'saved' : 'local-only');
        }
      } catch {
        if (isMounted) {
          setProfileSaveStatus('error');
        }
      }
    }

    saveRemoteProfile();

    return () => {
      isMounted = false;
    };
  }, [
    hasLoadedRemoteProfile,
    profile,
    profileSession.sessionId,
    savedProfileMajors,
  ]);

  function handleProfileChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }));
  }

  function handlePrintProfile() {
    window.print();
  }

  function resetProfile() {
    setProfile(emptyProfile);
    setSavedProfileMajors([]);
    saveCurrentUsfProfileMajors([]);
    window.localStorage.setItem(
      CURRENT_USF_PROFILE_STORAGE_KEY,
      JSON.stringify(emptyProfile),
    );
    setShowResetConfirmation(false);
  }

  function handleRemoveProfileMajor(slug: string) {
    setSavedProfileMajors(removeCurrentUsfProfileMajor(slug));
  }

  const autosaveLabel = {
    loading: 'Checking saved profile',
    saved: 'Autosaved to Supabase',
    'local-only': 'Autosaved locally',
    error: 'Local save only',
  }[profileSaveStatus];
  const editedDateLabel = new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
  const profileReportDetails = [
    { label: 'User group', value: selectedUserGroup?.label ?? '' },
    { label: 'Name or initials', value: profile.studentName },
    { label: 'U Number', value: profile.uNumber },
    { label: 'USF email', value: profile.usfEmail },
    { label: 'Current USF college', value: profile.currentCollege },
    { label: 'Current major or program', value: profile.currentMajor },
    { label: 'Year started at USF', value: profile.yearStarted },
    { label: 'Class standing', value: profile.classStanding },
    { label: 'Credits completed', value: profile.completedCredits },
  ].filter((detail) => detail.value.trim());
  const hasPrintableProfileContent =
    profileReportDetails.length > 0 ||
    savedProfileMajors.length > 0 ||
    profile.notes.trim() ||
    profile.questions.trim();

  return (
    <main className="degrees-page transition-planner-page current-usf-profile-page">
      <section className="degrees-hero">
        <div className="degrees-hero-header">
          <p className="degrees-eyebrow">Current USF student profile</p>
          <Link
            className="degree-back-link degrees-dashboard-link"
            to={dashboardRoute || '/dashboard/current-usf-student'}
          >
            Back to Dashboard
          </Link>
        </div>
        <div className="current-usf-profile-title-row">
          <h1>Your Profile</h1>
          <p className="current-usf-profile-edited-date">
            Date edited {editedDateLabel}
          </p>
        </div>
        <p>
          Keep a local snapshot of your current USF college, major context,
          Bellini programs you are considering, notes, and advising questions.
        </p>
      </section>

      <section className="high-school-planner transition-planner-print-area">
        <div className="transition-planner-shell">
          <form className="transition-planner-editor">
            <div className="transition-planner-card">
              <div className="transition-planner-card-heading">
                <FileText size={24} aria-hidden="true" />
                <div>
                  <h2>Build your profile</h2>
                  <p>
                    Saved only in this browser. Print or save as PDF when you
                    want a copy for advising or your own records.
                  </p>
                </div>
              </div>

              {selectedUserGroup ? (
                <div className="profile-detail">
                  <span>User group</span>
                  <strong>{selectedUserGroup.label}</strong>
                </div>
              ) : (
                <div className="transition-planner-major-empty">
                  <p>
                    No app user group has been selected yet. Choose a user group
                    so the platform can route you to the right dashboard.
                  </p>
                  <button type="button" onClick={() => navigate('/select-user-type')}>
                    Select user group
                  </button>
                </div>
              )}

              <label className="transition-planner-field">
                <span>Name or initials</span>
                <input
                  name="studentName"
                  type="text"
                  value={profile.studentName}
                  onChange={handleProfileChange}
                  placeholder="Optional"
                />
              </label>

              <label className="transition-planner-field">
                <span>U Number</span>
                <input
                  name="uNumber"
                  type="text"
                  value={profile.uNumber}
                  onChange={handleProfileChange}
                  placeholder="Example: U12345678"
                />
              </label>

              <label className="transition-planner-field">
                <span>USF email</span>
                <input
                  name="usfEmail"
                  type="email"
                  value={profile.usfEmail}
                  onChange={handleProfileChange}
                  placeholder="Example: netid@usf.edu"
                />
              </label>

              <label className="transition-planner-field">
                <span>Current USF college</span>
                <input
                  name="currentCollege"
                  type="text"
                  value={profile.currentCollege}
                  onChange={handleProfileChange}
                  placeholder="Example: College of Arts and Sciences"
                />
              </label>

              <label className="transition-planner-field">
                <span>Current major or program</span>
                <input
                  name="currentMajor"
                  type="text"
                  value={profile.currentMajor}
                  onChange={handleProfileChange}
                  placeholder="Example: Psychology"
                />
              </label>

              <label className="transition-planner-field">
                <span>Year started at USF</span>
                <input
                  name="yearStarted"
                  type="text"
                  value={profile.yearStarted}
                  onChange={handleProfileChange}
                  placeholder="Example: 2024"
                />
              </label>

              <label className="transition-planner-field">
                <span>Class standing</span>
                <select
                  name="classStanding"
                  value={profile.classStanding}
                  onChange={handleProfileChange}
                >
                  <option value="">Select class standing</option>
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                </select>
              </label>

              <label className="transition-planner-field">
                <span>Credits completed</span>
                <input
                  name="completedCredits"
                  type="number"
                  value={profile.completedCredits}
                  onChange={handleProfileChange}
                  placeholder="Example: 45"
                  min="0"
                />
              </label>

              <label className="transition-planner-field">
                <span>Notes</span>
                <textarea
                  name="notes"
                  value={profile.notes}
                  onChange={handleProfileChange}
                  placeholder="Add notes from degree pages, conversations, or research about switching into Bellini College."
                  rows={4}
                />
              </label>

              <label className="transition-planner-field">
                <span>Questions I want to ask</span>
                <textarea
                  name="questions"
                  value={profile.questions}
                  onChange={handleProfileChange}
                  placeholder="Example: How would my completed USF courses apply if I change colleges or majors?"
                  rows={4}
                />
              </label>

              <div className="transition-planner-actions">
                <button type="button" onClick={handlePrintProfile}>
                  <Printer size={18} aria-hidden="true" />
                  Print / Save PDF
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setShowResetConfirmation(true)}
                >
                  <RotateCcw size={18} aria-hidden="true" />
                  Reset
                </button>
                <span>
                  <Save size={16} aria-hidden="true" />
                  {autosaveLabel}
                </span>
              </div>
            </div>
          </form>

          <article
            className="transition-planner-report"
            aria-labelledby="current-usf-profile-report-title"
          >
            <p className="transition-report-kicker">Programs of interest</p>
            <h2 id="current-usf-profile-report-title">
              Programs Added to Profile
            </h2>

            {savedProfileMajors.length > 0 ? (
              <section>
                <ul className="transition-report-program-list">
                  {savedProfileMajors.map((major) => (
                    <li key={major.slug}>
                      <span>{major.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveProfileMajor(major.slug)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ) : (
              <p className="transition-planner-empty">
                Add programs from the degree explorer to see them here.
              </p>
            )}

            <section className="current-usf-quiz-recommendations-placeholder">
              <p className="transition-report-kicker">Quiz recommendations</p>
              <h2>Recommendations Added from Quiz</h2>
              <p>
                Quiz recommendation results will appear here after this section
                is connected.
              </p>
            </section>
          </article>

          <article
            className="transition-planner-report current-usf-print-report"
            aria-labelledby="current-usf-print-report-title"
          >
            <p className="transition-report-kicker">Printable report</p>
            <h2 id="current-usf-print-report-title">Your Profile Report</h2>
            <p className="transition-report-date">Date edited {editedDateLabel}</p>

            {hasPrintableProfileContent ? (
              <>
                {profileReportDetails.length > 0 && (
                  <section>
                    <h3>Student Information</h3>
                    <div className="profile-report-detail-list">
                      {profileReportDetails.map((detail) => (
                        <p key={detail.label}>
                          <strong>{detail.label}:</strong> {detail.value}
                        </p>
                      ))}
                    </div>
                  </section>
                )}

                {savedProfileMajors.length > 0 && (
                  <section>
                    <h3>Programs of Interest</h3>
                    <ul>
                      {savedProfileMajors.map((major) => (
                        <li key={major.slug}>{major.name}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {profile.notes.trim() && (
                  <section>
                    <h3>Notes</h3>
                    <p className="transition-planner-prewrap">
                      {profile.notes.trim()}
                    </p>
                  </section>
                )}

                {profile.questions.trim() && (
                  <section>
                    <h3>Questions to Ask</h3>
                    <p className="transition-planner-prewrap">
                      {profile.questions.trim()}
                    </p>
                  </section>
                )}
              </>
            ) : (
              <p className="transition-planner-empty">
                Add details to your profile to build a printable report.
              </p>
            )}
          </article>
        </div>
      </section>

      {showResetConfirmation && (
        <div
          className="transition-confirmation-overlay"
          role="presentation"
          onClick={() => setShowResetConfirmation(false)}
        >
          <section
            aria-labelledby="profile-confirmation-title"
            aria-modal="true"
            className="transition-confirmation-dialog"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="transition-confirmation-icon">
              <AlertTriangle size={26} aria-hidden="true" />
            </div>
            <div>
              <p className="dashboard-eyebrow">Confirm change</p>
              <h2 id="profile-confirmation-title">Reset profile?</h2>
              <p>
                This will clear your saved Current USF profile summary in this
                browser.
              </p>
            </div>
            <div className="transition-confirmation-actions">
              <button type="button" onClick={() => setShowResetConfirmation(false)}>
                Cancel
              </button>
              <button className="danger" type="button" onClick={resetProfile}>
                Reset Profile
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default Profile;
