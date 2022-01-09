import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    static noteStart: number = 1.1
    static noteEnd: number = 0.9

    video: Phaser.GameObjects.Video | null;
    spacePressed: Phaser.Input.Keyboard.Key | null;
    startTime: number | null;
    currentNotes: Array<number> | null;
    actionGraphics: Phaser.GameObjects.Graphics | null;
    scoredNotes: Record<number, boolean> | null;
    score: Phaser.GameObjects.Text | null;
    currentTime: number | null;
    constructor() {
        super("game");
        this.video = null;
        this.spacePressed = null;
        this.startTime = null;
        this.currentNotes = null;
        this.actionGraphics = null;
        this.scoredNotes = null;
        this.score = null;
        this.currentTime = null;
    }

    preload() {
        this.load.video('spot-me-up', 'videos/spot-me-up-scaled.mp4', 'loadeddata', false, false);
        this.load.json('beats', 'beats/beats.json')
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.video = this.add.video(width / 2, height / 4, 'spot-me-up');
        const graphics = this.add.graphics();
        this.actionGraphics = this.add.graphics();

        graphics.fillStyle(0x101010);
        graphics.fillRect(0, height / 2, width, height / 2);

        const polygonPoints = [
            new Phaser.Geom.Point(0, height),
            new Phaser.Geom.Point(width / 2 - 10, height / 2),
            new Phaser.Geom.Point(width / 2 + 10, height / 2),
            new Phaser.Geom.Point(width, height),
        ];
        graphics.fillStyle(0x202020);
        graphics.fillPoints(polygonPoints, true, true);


        graphics.lineStyle(2, 0x2020D0);
        graphics.lineBetween(0, height, width / 2 - 10, height / 2);
        graphics.lineBetween(width / 2 + 10, height / 2, width, height);

        this.spacePressed = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true, false);
        this.score = this.add.text(width - 100, 20, "0");
    }

    calculateScore() {
        let wasNote = false;
        if (this.currentTime === null || this.currentNotes === null || this.score === null) {
            return;
        }

        for (var note of this.currentNotes) {
            const noteFromNow = note - this.currentTime + 1;
            if (noteFromNow < GameScene.noteStart && noteFromNow > GameScene.noteEnd) {
                wasNote = true;
                if (this.scoredNotes !== null && !this.scoredNotes[note]) {
                    this.score.setText(String(parseInt(this.score.text, 10) + 1));
                    this.scoredNotes[note] = true;
                }
            }

            if (noteFromNow > GameScene.noteStart) {
                break;
            }
        }
        if (!wasNote) {
            this.score.setText(String(parseInt(this.score.text, 10) - 1));
        }
    }


    update(time: number, delta: number) {
        if (this.spacePressed && this.spacePressed.isDown && this.startTime === null) {
            if (this.video) {
                this.startTime = time;
                this.currentNotes = this.cache.json.get('beats');
                this.scoredNotes = {};
                this.spacePressed.reset();
                if (this.score !== null) this.score.setText("0");
                this.video.play();
            }
        }

        if (this.startTime === null || this.currentNotes === null || this.actionGraphics === null || this.spacePressed == null || this.score === null) {
            return;
        }

        const currentTime = (time - this.startTime) / 1000;
        this.currentTime = currentTime;
        const notes: Array<number> = []
        for (var i = 0; i < this.currentNotes.length; i++) {
            const note = this.currentNotes[i];
            if (note < currentTime - 1.0) {
                this.currentNotes.splice(i, 1);
            } else if (note > currentTime + 3) {
                break;
            }
            notes.push(note);
        }

        const renderedNoteInterval = 4
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.actionGraphics.clear();
        this.actionGraphics.lineStyle(2, 0x2020D0);
        this.actionGraphics.fillStyle(0x802080);
        for (var note of notes) {
            const noteFromNow = note - currentTime + 1;
            if (noteFromNow < GameScene.noteStart && noteFromNow > GameScene.noteEnd) {
                this.actionGraphics.fillStyle(0x2020D0);
            }
            this.actionGraphics.fillEllipse(width / 2,
                height / 2 + (renderedNoteInterval - noteFromNow) * (height / 2) / renderedNoteInterval,
                (renderedNoteInterval - noteFromNow) * (width - 20) / renderedNoteInterval,
                10);
            if (noteFromNow < GameScene.noteStart && noteFromNow > GameScene.noteEnd) {
                this.actionGraphics.fillStyle(0x802080);
            }
        }


        this.actionGraphics.lineBetween((width - 20) / 2 - (renderedNoteInterval - GameScene.noteStart) * ((width - 20) / 2) / renderedNoteInterval,
            height / 2 + (renderedNoteInterval - GameScene.noteStart) * (height / 2) / renderedNoteInterval,
            width - ((width - 20) / 2 - (renderedNoteInterval - GameScene.noteStart) * ((width - 20) / 2) / renderedNoteInterval),
            height / 2 + (renderedNoteInterval - GameScene.noteStart) * (height / 2) / renderedNoteInterval);

        this.actionGraphics.lineBetween(
            (width - 20) / 2 - (renderedNoteInterval - GameScene.noteEnd) * ((width - 20) / 2) / renderedNoteInterval,
            height / 2 + (renderedNoteInterval - GameScene.noteEnd) * (height / 2) / renderedNoteInterval,
            width - ((width - 20) / 2 - (renderedNoteInterval - GameScene.noteEnd) * ((width - 20) / 2) / renderedNoteInterval),
            height / 2 + (renderedNoteInterval - GameScene.noteEnd) * (height / 2) / renderedNoteInterval);

        if (this.spacePressed.isDown) {
            this.calculateScore();
            this.spacePressed.reset();
        }
    }
}
