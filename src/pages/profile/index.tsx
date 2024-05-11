import {Page} from "@/shared/ui/page";
import {Typography} from "@/shared/ui/typography";
import {useUserStore} from "@/entities/user/model/store";
import {Box} from "@/shared/ui/box";


const Profile = () => {

  const profile = useUserStore.use.profile();

  console.log(profile);
  return (
    <Page>
      <Box>
        <Typography affects={'large'}>
          Профиль {profile?.login}
        </Typography>
      </Box>
    </Page>
  )
}


export default Profile