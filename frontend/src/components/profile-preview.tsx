import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { followProfile, unfollowProfile } from "../services/user.service";
import { Profile } from "../shared/data-access/api/models/user";

interface ProfilePreviewProps {
  profile: Profile;
  isOwner: boolean
}

export const ProfilePreview = ({ profile, isOwner }: ProfilePreviewProps) => {

  const navigate = useNavigate()
  const [currentProfile, setCurrentProfile] = useState<Profile>(profile)

  const handleOnSuccess = (data: { profile: Profile }) => {
    setCurrentProfile({
      ...data.profile
    })
  }

  const { mutate: handleFollowProfile } = useMutation({ mutationKey: ["follow_profile"], mutationFn: () => followProfile(profile.username), onSuccess: handleOnSuccess })
  const { mutate: handleUnFollowProfile } = useMutation({ mutationKey: ["unfollow_profile"], mutationFn: () => unfollowProfile(profile.username), onSuccess: handleOnSuccess })


  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src={currentProfile.image} className="user-img" />
            <h4>{currentProfile.username}</h4>
            <p>
              {currentProfile.username}
            </p>
            {
              isOwner ?
                <button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => navigate("/settings")}>
                  <i className="ion-gear-a"></i>
                  &nbsp; Edit Profile Settings
                </button>
                :
                currentProfile.following ?
                  <button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => handleUnFollowProfile()}>
                    <i className="ion-minus-round"></i>
                    &nbsp; Unfollow {currentProfile.username}
                  </button>
                  : <button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => handleFollowProfile()}>
                    <i className="ion-plus-round"></i>
                    &nbsp; Follow {currentProfile.username}
                  </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
