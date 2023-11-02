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
  if(typeof body.code == 'undefined' || typeof body.cookies == 'undefined' || typeof body.storeState == 'undefined'){
    return res.status(400).json({error: 'Correct parameters not supplied'})
  }

  console.log(body.cookies)
  console.log(body.storeState)
  console.log(body.code)

  const { error } = await supabase
    .from('cookie')
    .update({ "cookies" : body.cookies,
              "upgrades" : body.storeState
          })
    .eq('code', body.code)

  console.log(error)

  if (error) {
    console.log(error);
    if (error.message == "TypeError: NetworkError when attempting to fetch resource.") {
      return res.status(400).json({error: "Bad Internet Connection!"});
    } else {
      return res.status(400).json({error: "Wrong code!"});
    }
  }else{
    return res.status(200).json({message: 'Success'});
  }
}
