import { addNewPlayerToDB } from '../../lib/utils'
import supabase from "supabase";


export default (req, res) => {
  if (req.method === 'POST') {
    run(req,res)
  } else {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
};

function run(req, res){
    var body = JSON.parse(req.body);
  if(typeof body.randomCode == 'undefined' || typeof body.storeState == 'undefined'){
    return res.status('400').json({error: 'Correct parameters not supplied'})
  }
  if(addNewPlayerToDB(body.randomCode, body.storeState)){
    return res.status('200').json({message: 'Success'})
  }else{
    return res.status('400').json({error: 'Could not add to db'})
  }
}
