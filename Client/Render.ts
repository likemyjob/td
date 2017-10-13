/// <reference path="helper/FPSMeter.d.ts" />
import {Container, Service} from 'typedi';
import {EntityManager} from './Manager/EntityManager';
import {Player} from './Entity/Player';
@Service()
export class Render {
    public app: PIXI.Application;
    public em: EntityManager;
    public width: number;
    public height: number;
    public resources: any;

    world: PIXI.Container = new PIXI.Container();

    constructor() {
        PIXI.loader
            .add('sample', 'Client/Assets/sample.png')
            .load(this.onLoaded.bind(this));
    }

    public onLoaded(loader: any, res: any) {
        this.resize();
        this.app = new PIXI.Application(this.width, this.height, {
            backgroundColor: 0x1a6f1d,
            antialias: true,
            autoResize: true
        }, false);
        document.getElementById('wrapper').appendChild(<Node>this.app.view);
        this.app.stop();
        this.resources = res;
        let meter = new FPSMeter();

        this.app.stage.addChild(this.world);

        this.world.position.x = this.width / 2;
        this.world.position.y = this.height / 2;

        let gr = new PIXI.Graphics();
        gr.beginFill(0x000000);
        gr.lineStyle(2, 0x000000, 1);
        for (let i = 0; i < 10; i++) {
            gr.moveTo(-1000, i * 50);
            gr.lineTo(1000, i * 50);
            for (let j = 0; j < 10; j++) {
                gr.moveTo(j * 50, -1000);
                gr.lineTo(j * 50, 1000);
            }
        }
        gr.endFill();

        this.world.addChild(gr);

        let gr2 = new PIXI.Graphics();
        gr2.lineStyle(1, 0x000000, 1);
        gr2.beginFill(0xFFFFFF, 1);
        gr2.drawCircle(0, 0, 10);
        gr2.endFill();

        this.world.addChild(gr2);

        this.app.start();

        this.em = Container.get(EntityManager);

        this.app.ticker.add((delta: number) => {
            this.focusToPoint();
            meter.tick();
            this.update(delta);
        });
    }

    private focusToPoint() {
        let player = Container.get(Player);
        let plPos = player.getPosition();

        let point = {
            x: this.width / 2 - plPos.x,
            y: this.height / 2 - plPos.y
        };

        let x = point.x - this.world.position.x;
        let y = point.y - this.world.position.y;

        let len = Math.sqrt(x * x + y * y);
        if (len) {
            this.world.position.x += ~~(len / 50) * x / len;
            this.world.position.y += ~~(len / 50) * y / len;
        }

        // console.log(this.world.position);
    }

    private resize() {
        this.width = document.getElementById('wrapper').offsetWidth;
        this.height = document.getElementById('wrapper').offsetHeight;
        let that = this;
        window.onresize = function (event) {
            that.width = document.getElementById('wrapper').offsetWidth;
            that.height = document.getElementById('wrapper').offsetHeight;
            that.app.renderer.resize(that.width, that.height);
        };
    }

    public update(delta: number) {
    }
}
