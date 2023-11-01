import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function getProfileData(code) {
  console.log(code)
  const supabase = createClientComponentClient()
  try {
    const { data, error, status } = await supabase
          .from('cookie')
          .select(`id, cookies`)
          .eq("id", code)
          .single()
    if (error && status !== 200) {throw error}
    if (data) {
      //TODO : ADD ALL UPGRADES TOO
      window.cookies = data.cookies
    }
  
      } catch (error) {
        return (
          <h1>Choose your gamestyle :</h1>
        )
      }

}
