import gql from 'graphql-tag';
import _ from 'lodash';
import { escapeRawText } from '../lib/utils';
import uuid from 'uuid/v4';

export const decomposeCsvRowsIntoQglObjects = (csvRows) => {
    let risks = [];

    _.each(csvRows, line => {
        line = _.map(line, attr => escapeRawText(attr));
        let [id, title, description, cause, consequence, topologyId, topologyOnshoreOffshore, topologyUpstreamDownstream, topologyOilGas, topologyFacilityType, disciplineId, disciplineName] = line/*.split('|')*/;

        if (id && title && description && cause && consequence && topologyId && topologyOnshoreOffshore && topologyUpstreamDownstream && topologyOilGas && topologyFacilityType && disciplineId && disciplineName) {
            risks.push(`{
                id: "${id}", 
                title: "${title}", 
                description: "${description}", 
                cause: "${cause}", 
                consequence: "${consequence}", 
                topology: {
                    id: "${topologyId}",
                    onshoreOffshore: "${topologyOnshoreOffshore}",
                    upstreamDownstream: "${topologyUpstreamDownstream}",
                    oilGas: "${topologyOilGas}",
                    facilityType: "${topologyFacilityType}"
                }, 
                discipline: {
                    id: "${disciplineId}", 
                    name: "${disciplineName}"
                }
            }`);
        }
    });
    return risks;
};

export const uploadRisksQuery = csvRows => {
    let gqlQuery = decomposeCsvRowsIntoQglObjects(csvRows);
    return gql`{
        classifyNewRisks(risks: [${gqlQuery}]) { 
            id
        }
    }`;
};

export const getRiskProfileQuery = () => {
    return gql`{
      getRiskProfile {
          compoundRisk
          riskBuckets {
           id
           severity 
           likelihood
           numberOfRisks 
           numberOfLowConfidenceRisks
           averageConfidenceLevel
           risks {
             id
             risk {
               id
               title
               description
               cause
               consequence
               discipline {
                 id
                 name
               }
             }
             severityLikelihoodRisk {
               id
               risk {
                 id
                 title
                 description
                 cause
                 consequence
                 discipline {
                  id
                  name
                 }
               }
               severity
               likelihood
               confidenceLevel
               lowConfidence
               score
               contributors {
                 id
                 featureName
                 featureValue
                 weight
               }
               recommends {
                 id
                 featureName
                 featureValue
                 weight
               }
             }
             pppRisk {
               id
               risk {
                  id
                  title
                  description
                  cause
                  consequence
                  discipline {
                      id
                      name
                  }
               }
               engineeringModule {
                 id
                 name
                 hardwares {
                   id
                  
                 }
                 criticality
               }
               hardwareFailures {
                 id
                 hardware {
                   id
                   name
                   description
                 }
                 possibleFailure {
                  id                  
                  type
                  name
                  description
                 }
                 description
                 likelihood
                 severity
                 risk {
                   id
                 }
               }
               processFailures {
                 id
                 process {
                   id
                 }
                 possibleFailure {
                   id
                 }
                 description
                 likelihood
                 severity
                 risk {
                   id
                 }
               }
               peopleFailures {
                 id
                 role {
                   id
                 }
                 possibleFailure {
                   id
                 }
                 description
                 likelihood
                 severity
                 risk {
                   id
                 }
               }
             }
           }
         }
        }
     }`;
};

export const deleteCurrrentRiskProfileDataSetQuey = () => {
    return gql`query {
        reset{ id }
    }`;
};

export const reloadCurrentRiskProfileDataSetQuery = () => {
    return gql`query {
        reload{ id }
    }`;
};

export const addIRISUserQuery = userProfile => gql`{addIRISUser(user: {
    id: "${userProfile.email}"
    userId: "${userProfile.email}"
    fullName: "${userProfile.name}"
    email: "${userProfile.email}"
})}`;

export const feedbackOnIRISAppQuery = (userProfile, feedback) => {
    return gql`{feedbackOnIRISApp(comments: [
        {   
            id: "${feedback.id}"
            user: "${userProfile.email}"
            on: "${feedback.on}"
            about: "${feedback.about}"
            rating: ${feedback.rating}
            comment: "${feedback.comment}"
        }
    ])}`;
};

export const feedbackOnClassifiedRisksQuery = riskObj => {
    return gql`{feedbackOnClassifiedRisks(risks: [
        {   
            id: "${uuid()}"
            risk: "${riskObj.risk.id}"
            severity: "${riskObj.severity + 1}"
            likelihood: "${riskObj.likelihood + 1}"
        }
    ])}`;
};

export const getOffshoreTrendsQuery = () => {
  return gql`{ offshoreTrends{
    id name
    boundary {
      latitude 
      longitude
    }
   }}`;
};

export const MajorCapitalProjectAsInput = ({
  generalitiesFormData,
  environmentalConditionsFormData,
  productionFluidsFormData,
  subsurfaceFormData
}) => {

  if(!generalitiesFormData ||
    !environmentalConditionsFormData ||
    !productionFluidsFormData ||
    !subsurfaceFormData){
      alert('There are pending forms to be filled, please complete knowledge source input ');
  }

  const checkGeoTechnicalConditions = (gtc) => {
    return environmentalConditionsFormData.geoTechnicalConditions.indexOf( gtc ) >= 0;
  };

  const checkTopologyConditions = (prop, value) => {
    return generalitiesFormData[prop] === value;
  };

  return gql`{ 
    saveMCPData(mcp: {
      id: "${uuid()}"
      name: "${generalitiesFormData.capitalProject}"
      topology: {
        id: "${uuid()}"
        onshore: false
        offshore: true
        upstream: true
        downstream: false
        oilDominated: ${checkTopologyConditions('oilGas', 'oil')}
        gasDominated: ${checkTopologyConditions('oilGas', 'gas')}
      }
      geography: {
        latitude: ${generalitiesFormData.latLng[0]}
        longitude: ${generalitiesFormData.latLng[1]}
      },
      fluids: {
        oilCharacterization: {
          id: "${uuid()}"
          blackoilProperties: {
            id: "${uuid()}"
            oilSpecificGravity: 0.9
            deadOilviscosity: 1195.54
            referenceTemperature: ${parseFloat(productionFluidsFormData.referenceTemperature)}
          }
        }
        waxApperanceTemperature: ${parseFloat(productionFluidsFormData.waxAppareanceTemperature)}
        hydrateFormationPressure: ${parseFloat(productionFluidsFormData.hydrateFormationPresure)}
      }
      environmentalConditions: {
        offshoreDevelopment: {
          waterDepth: ${parseFloat(environmentalConditionsFormData.waterDepth)}
          geoTechnicalConditions: {
            id: "${uuid()}"
            canyons: ${checkGeoTechnicalConditions('Canyons')}
            escarpments: ${checkGeoTechnicalConditions('Escarpments')}
            seismicActivity: ${checkGeoTechnicalConditions('Seismic Activity')}
            geohazards: ${checkGeoTechnicalConditions('Geo Hazards')}
          }
          seafloorDevExtension: ${parseFloat(environmentalConditionsFormData.seafloorDevelopmentExtension)}
        }
      }
      highNaturalFlowPotential: ${subsurfaceFormData.highNaturalFlowPotential}
      flowingTemperature: ${parseFloat(subsurfaceFormData.flowingTemperature)}
      flowingPressure: ${parseFloat(subsurfaceFormData.flowingPresure)}
      waterInjection: true
      gasInjection: true
    }) 
  }`;

};

export const givenMCPIDWhatAreConceptsQuery = (projectID) => {
  return gql`{
    givenMCPIDWhatAreConcepts(projectID:"${projectID}") {
      id
      compoundScore
      concept {
        id
        project {
          id,
          name
        }
        onshoreConcept {
          id
          wellTypes 
            {
              id
              producer
              injector
              oilProduction
              gasProduction
              waterInjection
              gasInjection
              subsea
              dryTree
            }
          processFacilities 
            {
              id
              onshore
              offshore
              hub {
                id
                onshore
                offshore
                semisubmersible
                submersible
                tlp
                fpso
                fpu
                spar
              }
              oilProcessingType
              gasProcessingType
              waterTreatmentType
              oilStorageType
              exportType {
                id
                onshore
                offshore
                oil
                gas
                oilOffloading
                oilExportLine
                gasExportLine
                condensateExportLine
              }
            }
        }
        offshoreConcept {
          id
          wellTypes 
            {
              id
              producer
              injector
              oilProduction
              gasProduction
              waterInjection
              gasInjection
              subsea
              dryTree
            }
          productionNetworkType {
            id
            onshore
            offshore
            name
            description
          }
          waterInjectionNetworkType {
            id
            onshore
            offshore
            singleWaterInjectionFlowline
            multipleWaterInjectionFlowlines
          }
          gasInjectionNetworkType {
            id
            onshore
            offshore
            singleGasInjectionFlowline
            multipleGasInjectionFlowlines
          }
          facilityType {
            id
            onshore
            offshore
            hub {
              id
              onshore
              offshore
              semisubmersible
              submersible
              tlp
              fpso
              fpu
              spar
            }
            oilProcessingType
            gasProcessingType
            waterTreatmentType
            oilStorageType
            exportType {
              id
              onshore
              offshore
              oil
              gas
              oilOffloading
              oilExportLine
              gasExportLine
              condensateExportLine
            }
          }
        }
        conceptDiagramUrl
      }
      operabilityScore
      fabricationScore
      timeToProductionScore
      reliabilityScore
    }
 }`;
}

export const getAllMajorCapitalProjectsQuery = (take = 100, offset = 0) => {
  return gql`
    { 
      allMajorCapitalProjects(take: ${take}, offset: ${offset}) {
        id
        name
        topology {
          id,
          onshore,
          offshore,
          upstream,
          downstream,
          oilDominated,
          gasDominated
        }
        geography {
          id
          latitude
          longitude
        }
        allocatedCapex
        fluids {
          id
          oilCharacterization {
            id
            blackoilProperties {
              id
              oilSpecificGravity
              deadOilviscosity
              referenceTemperature
            }
          }
          waxApperanceTemperature
          hydrateFormationPressure
        }
        environmentalConditions {
          id
          offshoreDevelopment {
            waterDepth
            geoTechnicalConditions {
              id
              canyons
              escarpments
              seismicActivity
              geohazards
            }
            seafloorDevExtension
          }
        }
        highNaturalFlowPotential
        flowingTemperature
        flowingPressure
        waterInjection
        gasInjection
      }
    }
  `;
};
