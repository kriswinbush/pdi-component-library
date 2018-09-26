import { Component,  Prop, State, Event, EventEmitter, Element } from "@stencil/core";

@Component({
    tag: 'pdi-media-controller',
    styleUrl: 'pdi-media-controller.scss'
})

export class PdiMediaController {
    @Element() mediaControllerEl: HTMLElement;

    @Prop() controllerSize: string = "40px";
    @Prop() controllerIconColor: string = "blue";

    @State() playPauseToggle: string;
    @State() activeBtn: string;
    @State() activeLoop: boolean;
    @Event() onPlayerMediaUpdate: EventEmitter;

    componentDidLoad(): void {
        this.mediaControllerEl.style.fontSize = this.controllerSize;
        //this.mediaControllerEl.style.color = this.controllerIconColor;
    }

    onClickHandler(event): void {
        let { target: { id } } = event;
        id === "loop" ? (this.activeLoop = !this.activeLoop) : this.activateButton(id);
        
        this.playPauseToggle = id;
        this.onPlayerMediaUpdate.emit({id, loop: this.activeLoop });
    }
    $(element){
        return this.mediaControllerEl.querySelector(element);
    }
    onMouseDownHandler(event): void {
        let { target: { id } } = event;
        this.$(`#${id}`)['style'].transform = 'scale(.75,.75)';
    }

    onMouseUpHandler(e): void {
        let el = document.querySelector(`#${e.target.id}`);
        el['style'].transform = 'scale(1.0,1.0)';
    }
    onMouseOutHandler(e): void {
        let {id, style: { transform }} = e.target;
        let el = document.querySelector(`#${id}`);
        transform === 'scale(0.75, 0.75)' ? el['style'].transform = 'scale(1.0,1.0)' : null;
    }

    activateButton(name: string): void {
        
        if(name === "play") {
            this.activeBtn = "pause";
        } else if(name === "pause") {
            this.activeBtn = "play";
        } else {
            this.activeBtn = name;
        }
    }

    btnBaseComp(name) {
        return (
            <span 
                id={`${name}`} 
                class={`${name} ${ `${name}` === "loop" ?  this.activeLoop ? 'active' : null : null } ${this.activeBtn === `${name}` ? 'active' : 'inActive' }`} 
                onClick={(e) => this.onClickHandler(e)}
                onMouseDown={(e) => this.onMouseDownHandler(e)}
                onMouseUp={(e) => this.onMouseUpHandler(e)}
                onMouseOut={ e => this.onMouseOutHandler(e)}>
            </span>
        )
    }
    @Prop() btnLabels = ['loop', 'play', 'pause', 'step-back', 'step-forward', 'rewind', 'fast-forward', 'previous', 'next'];
    render() {
        let playPause = this.btnBaseComp("play");
        if(this.playPauseToggle === 'play') {
            playPause = this.btnBaseComp("pause")
        }
        return (
            <div class="container">
                { this.btnLabels.map( label =>label === 'play' ? playPause : label === 'pause' ? null : this.btnBaseComp(label)) }
            </div>
        )
    }
}