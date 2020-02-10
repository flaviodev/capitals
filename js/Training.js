class Training {
    constructor(arrayState) {
      this.states = this._shuffle(arrayState);
      this.capitals  = this._capitals(arrayState);
      this.currentStateIndex = 0;
      this.totalStatesAnswered = 0;
      this.totalWrongAnswers = 0;
      this.totalCorrectAnswers = 0;
      this.totalTimeResponse = 0;
      this.totalScore = 0;
    }

    getState(index) {
        return this.states[index];
    }

    getCurrentState() {
        if(this.currentStateIndex >= this.states.length)
            return undefined;

        return this.states[this.currentStateIndex];
    }

    setAnswer(state) {
        this.states[this.currentStateIndex] = state;

        if(state.isCorrectAnswer()) {
            this.totalCorrectAnswers++;
            this.totalScore += 10;
            this.totalScore += Math.round(state.savedTime/2);
        } else {
            this.totalWrongAnswers++;
            if(this.totalScore >= 5) {
                this.totalScore -= 5;
            } else {
                this.totalScore = 0;
            }
        }

        this.totalStatesAnswered++;
        this.totalTimeResponse += state.responseTime;

        this.currentStateIndex++;
    }

    getAvarageResponseTime() {
        return Math.ceil(this.totalTimeResponse / this.totalStatesAnswered);
    }

    _shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        
        while (0 !== currentIndex) {
        
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
        
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        
        return array;
    }
    
    _capitals(array) {
        var capitalsByType = [];
        capitalsByType[0] = [];
        capitalsByType[1] = [];

        array.forEach(e => {
            var capitals = capitalsByType[e.type.id];
            capitals.push(e.capital);
        });

        return capitalsByType;
    }
}