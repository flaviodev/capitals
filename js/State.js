class State {
    constructor(name, type, capital) {
      this.name = name;
      this.type = type;
      this.capital = capital;
      this.answer = undefined;
      this.responseTime = undefined;
      this.savedTime = undefined;
    }

    isCorrectAnswer() {
      if(this.answer === this.capital) {
        return true;
      }

      return false;
    }
    
    toString() {
      var _answer = "?";
      if(this.answer)
        _answer = this.answer;

      return this.name + " : " +  _answer;
    }
}