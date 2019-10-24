import * as React from 'react';
import GridLayout from 'react-grid-layout';
import Select from 'react-select';


//https://www.lifewire.com/what-is-hsv-in-design-1078068
const options = [
    { value: '1', label: 'Red', min: 0, max: 60},
    { value: '2', label: 'Yellow', min: 61, max: 120 },
    { value: '3', label: 'Green', min: 121, max: 180 },
    { value: '4', label: 'Cyan', min: 181, max: 240 },
    { value: '5', label: 'Blue', min: 241, max: 300 },
    { value: '6', label: 'Magenta', min: 301, max: 360 },
];

export default class Counter extends React.Component {
    state = {
        colors: Array<string>(),
        selectedColors: Array<string>(),
        selectedOption: null,
        allowSelect:Boolean,
        saturation: Boolean
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

    handleChange = (selectedOption: any) => {
        this.setState(state => ({
            selectedOption: selectedOption,
            allowSelect: true,
        }));
        this.handleFilter()
    };

    handleFilter = () => {
        if(this.state.allowSelect) {
            this.handleFilterColor()
        }
    };

    handleFilterColor = () => {
        const option = this.state.selectedOption;
        if(option == null) return;

        let select: string[] = [];
        const {min: min1} = option;
        const min = min1;
        const {max: max1} = option;
        const max = max1;
        this.state.colors.map((value, index) => {
            let {r, g, b} = this.hexToRgb(value);
            let {h, s, l} = this.rgbToHsl(r, g, b);
            if(h > min && h < max)
                select.push(value)
        })

        this.setState(state => ({
            selectedColors: select
        }));
    };

    hexToRgb =  (hex: string) => {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : {
            r: 0,
            g: 0,
            b: 0
        };
    };

    rgbToHsl = (r:number,g:number,b:number) => {
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        // Calculate hue
        // No difference
        if (delta == 0)
            h = 0;
        // Red is max
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        // Green is max
        else if (cmax == g)
            h = (b - r) / delta + 2;
        // Blue is max
        else
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0)
            h += 360;

        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return {
            h: h,
            s: s,
            l: l
        }
    };

    render() {
        const { selectedOption } = this.state;
        // layout is an array of objects, see the demo for more complete usage
        let col = 5;
        let cr = 0;
        return (
          <div>
                <Select
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={options}
                />
              <GridLayout className="layout" cols={col} rowHeight={100} width={500}>
                  {this.state.selectedColors.map((value, index) => {
                      cr = Math.floor( index / col);
                      let cc = index % col;
                      return <div key={index} data-grid={{x: cc, y: cr, w: 1, h: 1, static: true}} style={{backgroundColor: value}}/>
                  })}
              </GridLayout>
          </div>

        )
    }
}
