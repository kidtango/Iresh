import React from "react";
import '../styles/KnowledgeTreeForms.css';
import _ from 'lodash';
import Concept from './Concept'

class ConceptsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    render() {
        let concepts = [];

        if(this.props.allConcepts){
            
            if(this.props.justConceptIdx !== undefined){
            concepts = [<Concept conceptData={this.props.allConcepts[this.props.justConceptIdx]} idx={this.props.justConceptIdx} key={this.props.justConceptIdx} authHeaders={this.props.authHeaders}/>];
            }
    
            if(this.props.conceptIdxToOmit !== undefined){
                _.each(this.props.allConcepts, (concept, idx) => {
                    if(this.props.conceptIdxToOmit !== idx) {
                        concepts.push(<Concept conceptData={this.props.allConcepts[idx]} idx={idx} key={idx} authHeaders={this.props.authHeaders}/>);
                    }
                })
            }
        }

        let conceptsContainer = concepts.length > 1 ? 
            (<div style={{maxHeight: '80vh', overflowY: 'scroll', overflowX: 'hidden'}}>
                {concepts}
            </div>) 
            : concepts;
        
        return (
            <div className="ConceptsList widget">
                {conceptsContainer}
            </div>
        );
    }
}

export default ConceptsList;