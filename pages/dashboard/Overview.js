import GaugeChart from 'react-gauge-chart';

export default function Overview(){
    return(
        <GaugeChart id="gauge-chart2"
                    nrOfLevels={20}
                    percent={0.86}
        />


    );

}