(()=> {
  'use strict';
  class Game {
    constructor(canvas, canvas2) {
      //canvas関連
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.canvas2 = canvas2;
      this.ctx2 = canvas2.getContext('2d');

      //スタートボタン
      this.start = document.getElementById('start');
      this.start.addEventListener('click', ()=> {
        this.gameStart();
        this.renderText();
        this.currentImage++;
        this.img.src = this.images[this.currentImage];
        this.renderImg();
      });

      //画像関連
      this.images = [
        'img/title.jpg',
        'img/stand.jpg'
      ];
      this.img = document.createElement('img');
      this.currentImage = 0;
      this.img.src = this.images[this.currentImage];
      this.agenstHandImg = [
        'img/gu-.jpg',
        'img/choki.jpg',
        'img/pa-.jpg'
      ];

      //テキスト関連
      this.texts = [
        '僕とジャンケンゲームしようよ',
        '準備はいい？',
        'じゃんけーん…',
        '',
        'ぽいっ！！'
      ];
      this.currentText = 0;

      //テキストクリック時イベント
      this.canvas2.addEventListener('click', e => {
        if(this.isGameOver === true && this.currentText === 5
          ) {
          return;
        }
        if(this.isGameOver === true && this.currentText === 4
          ) {
            if(this.decision() === 'あなたの勝ち') {
              this.renderWin();
            }
            if (this.decision() === 'あなたの負け') {
              this.renderLose();
            }
        }
        //手札選択時
        if(this.isSelecting) {
          const rect = this.canvas2.getBoundingClientRect();
          const point = Math.floor((e.clientX - rect.left) / 133);
          this.selectHand(point);
          this.randHand();
          this.texts[5] = `きみは${this.selectedHand}で、僕は${this.agenstHand}で、${this.decision()}だね`;
          this.currentText++;
          this.isSelecting = false;
        }
        //相手手札描画
        if(this.currentText === 3) {
          this.renderAgenst();
        }
        if(this.currentText === 5) {
          this.img.src = this.images[this.currentImage];
          this.renderImg();
        }

        this.nextText();
      });

      //手札関連
      this.selectedHand;
      this.agenstHand;
      this.hands = ['グー', 'チョキ', 'パー'];
      this.handsImg = document.createElement('img');
      this.handsImg.src = 'img/hands.jpg';
      this.isSelecting = false;

      //初期状態
      this.isGameOver = false;
      this.renderField();
      this.img.addEventListener('load', ()=> {
        this.renderImg();
      });
    }
    //スタートボタンメソッド
    gameStart() {
      this.start.classList.add('inactive');
      this.fadeIn(this.canvas);
      this.canvas2.classList.remove('inactive');
      this.fadeIn(this.canvas2);
    }

    //フィールド描画メソッド
    renderField() {
      this.ctx.fillStyle = '#eee';
      this.ctx.strokeStyle = '#aaa';
      this.ctx.lineWidth = '10';
      this.ctx.lineJoin = 'bavel';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    }

    //画像描画メソッド
    renderImg() {
      this.ctx.drawImage(
        this.img, 10, 10,
        this.canvas.width -20, this.canvas.height - 20
      );
    }

    //テキストウィンドウ描画メソッド
    renderWindow() {
      this.ctx2.fillStyle = '#eee';
      this.ctx2.strokeStyle = '#aaa';
      this.ctx2.lineWidth = '10';
      this.ctx2.lineJoin = 'bavel';
      this.ctx2.fillRect(0, 0, this.canvas2.width, this.canvas2.height);
      this.ctx2.strokeRect(0, 0, this.canvas2.width, this.canvas2.height);
    }

    //テキスト描画メソッド
    renderText() {
      this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
      this.renderWindow();
      this.ctx2.font = '16px Arial';
      this.ctx2.fillStyle = 'brown';
      this.ctx2.textAlign = 'left';
      this.ctx2.textBaseline = 'top';
      this.ctx2.fillText(this.texts[this.currentText], 25, 25);
    }

    //ネクストテキストメソッド
    nextText() {
      if(this.currentText === 2) {
        this.renderHands();
        return;
      }
      //あいこ時
      if(this.currentText === 5 && this.isGameOver === false) {
        this.currentText = 1;
        this.texts[2] = 'もう一回！あいこで…'
      }
      this.currentText++;
      this.renderText();
    }

    //手札描画メソッド
    renderHands() {
      this.isSelecting = true;
      this.ctx2.drawImage(
        this.handsImg,
        0, 0, 400, 90
      );
    }

    //手札選択メソッド
    selectHand(selected) {
      this.selectedHand = this.hands[selected];
    }

    //相手、手札選択メソッド
    randHand() {
      this.agenstHand = this.hands[Math.floor(Math.random() * 3)];
      // this.agenstHand = this.hands[0];
    }

    //相手、手札描画メソッド
    renderAgenst() {
        //グー
      if(this.agenstHand === this.hands[0]) {
          this.img.src = this.agenstHandImg[0];
          this.ctx2.drawImage(
          this.img, 10, 10,
          this.canvas.width -20, this.canvas.height - 20
        //チョキ
        )} else if(this.agenstHand === this.hands[1]) {
          this.img.src = this.agenstHandImg[1];
          this.ctx2.drawImage(
          this.img, 10, 10,
          this.canvas.width -20, this.canvas.height - 20
        )} else if(this.agenstHand === this.hands[2]) {
        //パー
          this.img.src = this.agenstHandImg[2];
          this.ctx2.drawImage(
          this.img, 10, 10,
          this.canvas.width -20, this.canvas.height - 20
        )}
      }

      //描画クリアメソッド
      clearField() {
        this.ctx.clearRect(
          0, 0, this.canvas.width, this.canvas.height
        );
      }

    //勝敗判定メソッド
    decision() {
      if(this.selectedHand === this.agenstHand) {
        return 'あいこ';
      } else if (this.selectedHand === 'グー' && this.agenstHand === 'チョキ') {
        this.isGameOver = true;
        return 'あなたの勝ち';
      } else if (this.selectedHand === 'チョキ' && this.agenstHand === 'パー') {
        this.isGameOver = true;
        return 'あなたの勝ち';
      } else if (this.selectedHand === 'パー' && this.agenstHand === 'グー') {
        this.isGameOver = true;
        return 'あなたの勝ち';
      } else {
        this.isGameOver = true;
        return 'あなたの負け';
      }
    }

    //勝利描画
    renderWin() {
      this.ctx.font ='bold 30px Verdana';
      this.ctx.fillStyle = 'red';
      this.ctx.textBaseline = 'top';
      this.ctx.fillText('You Win', 40, 20);
    }
    
    //敗北描画
    renderLose() {
      this.ctx.font ='bold 30px Verdana';
      this.ctx.fillStyle = 'blue';
      this.ctx.textBaseline = 'top';
      this.ctx.fillText('You Lose', 40, 20);
    }

    //フェードインメソッド
    fadeIn (target) {
      target.classList.add('fadein');
    }
  }

  const canvas = document.querySelector('canvas');
  const canvas2 = document.getElementById('hands');
  if (typeof canvas.getContext('2d') === 'undefined') {
    return;
  }
  new Game(canvas, canvas2);
})();