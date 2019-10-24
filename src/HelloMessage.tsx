import * as React from 'react';
import GridLayout from 'react-grid-layout';


export default class Counter extends React.Component {
    state = {
        colors: Array<string>(),
        selectedColors: Array<string>()
    };

    constructor({props}: { props: any }) {
        super(props);
        for (let i = 0; i < 40; i++) {
            this.state.colors.push(this.random())
        }
        this.state.colors.map((value, index) => {
            this.state.selectedColors.push(value)
        })
    }

    random = () => {
        return '#'+Math.floor(Math.random()*16777215).toString(16)
    };

    render() {
        // layout is an array of objects, see the demo for more complete usage
        let col = 5;
        let cr = 0;
        return (
            <GridLayout className="layout" cols={col} rowHeight={100} width={500}>
                {this.state.selectedColors.map((value, index) => {
                    cr = Math.floor( index / col);
                    let cc = index % col;
                    return <div key={index} data-grid={{x: cc, y: cr, w: 1, h: 1, static: true}} style={{backgroundColor: value}}/>
                })}
            </GridLayout>
        )
    }
}
