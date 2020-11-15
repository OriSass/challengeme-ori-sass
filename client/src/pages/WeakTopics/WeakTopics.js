import React ,{useState, useEffect} from 'react';
import network from '../../services/network';
import './WeakTopics.css';

function WeakTopics() {

    const [topics, setTopics] = useState();
    const [newTopic, setNewTopic] = useState("");
    const [newTopicCategory, setNewTopicCategory] = useState("FullStack");

    const fetchTopics = async() => {
        const { data } = await network.get('/api/v1/topics/allTopics');
        console.log(data);
        setTopics(data);
    }

    useEffect(() => {
        fetchTopics();
    }, [])

    const handlePlusOne = (event) => {
        console.log(`Event target:\n  ${event.target.id}`);
        const index = event.target.id;
        setTopics(prevArr => {
            const updatedTopics = [...prevArr];
            updatedTopics[index].demandCounter++;
            return updatedTopics;
        })
    }
    const AddNewTopic = async() => {
        //console.log("adding a topic");
        const topic = {newTopic, newTopicCategory};
        await network.post("/api/v1/topics/new-topic",topic);
        fetchTopics();
    }
    const renderTopics = () => {
        return (
            <table>
            <th>Weak Topics {newTopic}</th>
            {topics.map((topic, index) => {
                if(topic.authorized === true){
                return (
                <tr key={index} className="single-topic">
                   <td> {topic.name} : {topic.demandCounter}</td>
                   <td><button id={index} onClick={handlePlusOne}>+1</button></td>
                </tr>)
                }
            })}
            </table>
        )
    }
    
    //check if admin
    //add a place for admin to authorize new topics.
    //display all unauthorized topics
    //user topics

    return (
        <div id="wrapper">
        
            {topics ? renderTopics()
             : <></>} 
            <div>
                 add a topic:
                 <input type="text" onChange={({target}) => setNewTopic(target.value)} />
                 <select name="cars" id="cars" onChange={(e) => setNewTopicCategory(e.target.value)}>
                    <option value="FullStack">FullStack</option>
                    <option value="Cyber">Cyber</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div>
                <button onClick={AddNewTopic}>Add</button>
            </div>
        </div>
    )
}

export default WeakTopics
