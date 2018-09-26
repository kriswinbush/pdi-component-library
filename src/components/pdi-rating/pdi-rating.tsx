import { Component, Prop, State, Event, EventEmitter } from "@stencil/core";


@Component({
    tag: 'pdi-rating',
    styleUrl: 'pdi-rating.scss'
})
export class PdiRating {
    @Prop() maxValue: number = 5;
    @Prop({mutable: true}) value: number = 0;

    @State() starList: object[] = [];

    @Event() onRatingUpdated: EventEmitter;

    componentWillLoad() {
        this.createStarList(this.value);
    }    

    setValue(newValue) {
        this.value = newValue;
        this.createStarList(this.value);
        this.onRatingUpdated.emit({value: this.value});
    }
    closedStar(idx) {
        return <span class="rating" onMouseOver={() => this.createStarList(idx)} onMouseOut={() => this.createStarList(this.value)} onClick={() => this.setValue(idx)}>&#x2605;</span>
    }
    openStar(idx) {
        return <span class="rating" onMouseOver={() => this.createStarList(idx)} onMouseOut={() => this.createStarList(this.value)} onClick={() => this.setValue(idx)}>&#x2606;</span>
    }
    createStarList(numOfStars: number) {
        let starList = [];
        for(let i = 1; i <=this.maxValue; i++) {
            (i <= numOfStars) ? starList.push(this.closedStar(i)) : starList.push(this.openStar(i));
        }
        this.starList = starList;
    }

    render() {
        return (
            <div>
                {this.starList}
            </div>
        )
    }
}