import React ,{useState, useEffect} from 'react';
import network from '../../services/network';
import './WeakTopics.css';

function WeakTopics() {

    const [topics, setTopics] = useState();

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
            const updatedTopics = prevArr;
            console.log(`index is ${index}`);
            console.log(updatedTopics[index]);
            updatedTopics[index].demandCounter++;
            return updatedTopics;
        })
        //this.forceUpdate();
    }
    const renderTopics = () => {
        return (topics.map((topic, index) => {
            return (
            <div key={index} className="single-topic">
                {topic.name} : {topic.demandCounter} <button id={index} onClick={handlePlusOne}>+1</button>
            </div>)
        }))}

    return (
        <div id="wrapper">
            <div>table</div><br/>
            {topics ? renderTopics()
             : <></>} 
            <div>
                 add a topic:
            </div>
            <div>
                <button>Save</button>
            </div>
        </div>
    )
}

export default WeakTopics
