import supabase from 'supabase'


export default async (req, res) => {
  if (req.method === 'POST') {
    await run(req,res)
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

async function run(req, res){
  var body = JSON.parse(req.body);
  if(typeof body.code == 'undefined'){
    return res.status(400).json({error: 'Correct parameters not supplied'})
  }

  const { data, error } = await supabase
    .from('cookie')
    .select(`code, cookies, upgrades`)
    .eq("code", body.code)
    .single();

  console.log(data)
  console.log(error)

  if (error) {
    console.log(error);
    if (error.message == "TypeError: NetworkError when attempting to fetch resource.") {
      return res.status(400).json({error: "Bad Internet Connection!"});
    } else {
      return res.status(400).json({error: "Wrong code!"});
    }
  }else{
    return res.status(200).json({data});
  }
}
