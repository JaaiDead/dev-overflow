import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { ProfileMode } from "../data";

interface ProfileContextType {
  profile: ProfileMode;
  setProfile: (mode: ProfileMode) => void;
  toggleProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<ProfileMode>(() => {
    const stored = localStorage.getItem("profile-mode");
    return (stored === "business" ? "business" : "personal") as ProfileMode;
  });

  const setProfile = (mode: ProfileMode) => {
    setProfileState(mode);
    localStorage.setItem("profile-mode", mode);
  };

  const toggleProfile = () => {
    setProfile(profile === "personal" ? "business" : "personal");
  };

  useEffect(() => {
    localStorage.setItem("profile-mode", profile);
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, toggleProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
}
