const persianDate = require('persian-date');
class TimeSpan {
    constructor(start,end) {
        if(!(start instanceof Date))throw new TypeError('Start Time Must Be Instance Of Date Object');
        this._start = start;
        if(end instanceof Date)this._end = end;
    }
    
    parseMilliseconds(milliseconds){
        var now = new Date(),
            start = now - milliseconds;
        this._end = new Date();
        this._start = new Date(start);
        return this;
    }
    
    toString(pattern){
        if(typeof pattern === "undefined"){
            pattern = "";
            if(this.years !== 0){
                pattern = pattern + " YY Year" + (Math.abs(this.years) == 1 ? "":"s");
            }
            if(this.months !== 0){
                pattern = pattern + " MM Month" + (Math.abs(this.months) == 1 ? "":"s");
            }
            if(this.days !== 0){
                pattern = pattern + " DD Day" + (Math.abs(this.days) == 1 ? "":"s");
            }
            pattern = pattern.trimToEmpty() + (this.years !== 0 || this.months !== 0 || this.days !== 0 ? ", ":"") + "HH:II:SS:MS";
        }
        
        var result = pattern;
        
        result = result.replace(/(?<!\\)YY/g,this.years.toString());
        result = result.replace(/(?<!\\)MM/g,this.months.toString());
        result = result.replace(/(?<!\\)DD/g,this.days.toString());
        result = result.replace(/(?<!\\)HH/g,this.hours.toString());
        result = result.replace(/(?<!\\)II/g,this.minutes.fixDigits(2));
        result = result.replace(/(?<!\\)SS/g,this.seconds.fixDigits(2));
        result = result.replace(/(?<!\\)MS/g,this.milliseconds.fixDigits(3));
        
        result = result.replace(/(?<!\\)TD/g,this.totalDays.toString());
        result = result.replace(/(?<!\\)TH/g,this.totalHours.toString());
        result = result.replace(/(?<!\\)TI/g,this.totalMinutes.toString());
        result = result.replace(/(?<!\\)TS/g,this.totalSeconds.toString());
        result = result.replace(/(?<!\\)TM/g,this.totalMilliseconds.toString());
        
        result = result.replace(/\\YY/g,"YY");
        result = result.replace(/\\MM/g,"MM");
        result = result.replace(/\\DD/g,"DD");
        result = result.replace(/\\HH/g,"HH");
        result = result.replace(/\\II/g,"II");
        result = result.replace(/\\SS/g,"SS");
        result = result.replace(/\\MS/g,"MS");
        
        result = result.replace(/\\TD/g,"TD");
        result = result.replace(/\\TH/g,"TH");
        result = result.replace(/\\TI/g,"TI");
        result = result.replace(/\\TS/g,"TS");
        result = result.replace(/\\TM/g,"TM");
        
        return result;
    }
    
    toPersianString(pattern){
        if(typeof pattern === "undefined"){
            pattern = "";
            if(this.persianYears !== 0){
                pattern = pattern + " YY سال";
            }
            if(this.persianMonths !== 0){
                pattern = pattern + " MM ماه";
            }
            if(this.persianDays !== 0){
                pattern = pattern + " DD روز";
            }
            pattern = pattern.trimToEmpty() + (this.persianYears !== 0 || this.persianMonths !== 0 || this.persianDays !== 0 ? "، ":"") + "HH:II:SS:MS";
        }
        
        var result = pattern;
        
        result = result.replace(/(?<!\\)YY/g,this.persianYears.toString());
        result = result.replace(/(?<!\\)MM/g,this.persianMonths.toString());
        result = result.replace(/(?<!\\)DD/g,this.persianDays.toString());
        result = result.replace(/(?<!\\)HH/g,this.hours.toString());
        result = result.replace(/(?<!\\)II/g,this.minutes.fixDigits(2));
        result = result.replace(/(?<!\\)SS/g,this.seconds.fixDigits(2));
        result = result.replace(/(?<!\\)MS/g,this.milliseconds.fixDigits(3));
        
        result = result.replace(/(?<!\\)TD/g,this.totalDays.toString());
        result = result.replace(/(?<!\\)TH/g,this.totalHours.toString());
        result = result.replace(/(?<!\\)TI/g,this.totalMinutes.toString());
        result = result.replace(/(?<!\\)TS/g,this.totalSeconds.toString());
        result = result.replace(/(?<!\\)TM/g,this.totalMilliseconds.toString());
        
        result = result.replace(/\\YY/g,"YY");
        result = result.replace(/\\MM/g,"MM");
        result = result.replace(/\\DD/g,"DD");
        result = result.replace(/\\HH/g,"HH");
        result = result.replace(/\\II/g,"II");
        result = result.replace(/\\SS/g,"SS");
        result = result.replace(/\\MS/g,"MS");
        
        result = result.replace(/\\TD/g,"TD");
        result = result.replace(/\\TH/g,"TH");
        result = result.replace(/\\TI/g,"TI");
        result = result.replace(/\\TS/g,"TS");
        result = result.replace(/\\TM/g,"TM");
        
        return result.toPersianNumeric();
    }
    
    get totalMilliseconds(){
        return this.valueOf();
    }
    
    get totalSeconds(){
        return Math.floor(this.valueOf() / 1000);
    }
    
    get totalMinutes(){
        return Math.floor(this.valueOf() / (1000 * 60));
    }
    
    get totalHours(){
       return Math.floor(this.valueOf() / (1000 * 60 * 60)); 
    }
    
    get totalDays(){
       return Math.floor(this.valueOf() / (1000 * 60 * 60 * 24)); 
    }
    
    get milliseconds(){
        return this.totalMilliseconds % 1000;
    }
    get seconds(){
        return this.totalSeconds % 60;
    }
    get minutes(){
        return this.totalMinutes % 60;
    }
    get hours(){
        return this.totalHours % 24;
    }
    
    getAgeObject(){
        var end = this._end,
            start = this._start,
            reverse = false;
        
        if(!(end instanceof Date))end = new Date();
        
        if(end - start < 0){
            var middleware = start;
            start = end;
            end = middleware;
            reverse = true;
        }  
        
        var daysInMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
        var years = end.getFullYear() - start.getFullYear();
        var months = (end.getMonth() + 1) - (start.getMonth() + 1);
        var days = end.getDate() - start.getDate();
        if(days < 0){
            years--;
            months+=11;
            days += daysInMonth;
            if(months >= 12){
                years++;
                months-=12;
            }
        }
        if(months < 0){
            years--;
            months+=12;
        }
        
        return {reverse,years,months,days};
    }
    
    getPersianAgeObject(){
        var end = this._end,
            start = this._start,
            reverse = false;
        
        if(!(end instanceof Date))end = new Date();
        
        if(end - start < 0){
            var middleware = start;
            start = end;
            end = middleware;
            reverse = true;
        }  
        
        var daysInMonth = new persianDate(end).endOf('month').date();
        var years = new persianDate(end).year() - new persianDate(start).year();
        var months = new persianDate(end).month() - new persianDate(start).month();
        var days = new persianDate(end).date() - new persianDate(start).date();
        if(days < 0){
            years--;
            months+=11;
            days += daysInMonth;
            if(months >= 12){
                years++;
                months-=12;
            }
        }
        if(months < 0){
            years--;
            months+=12;
        }
        
        return {reverse,years,months,days};
    }
    
    get days(){
        var ageObject = this.getAgeObject();
        return ageObject.reverse ? ageObject.days * (-1) : ageObject.days;
    }
    get months(){
        var ageObject = this.getAgeObject();
        return ageObject.reverse ? ageObject.months * (-1) : ageObject.months;
    }
    get years(){
        var ageObject = this.getAgeObject();
        return ageObject.reverse ? ageObject.years * (-1) : ageObject.years;
    }
    
    get persianDays(){
        var ageObject = this.getPersianAgeObject();
        return ageObject.reverse ? ageObject.days * (-1) : ageObject.days;
    }
    get persianMonths(){
        var ageObject = this.getPersianAgeObject();
        return ageObject.reverse ? ageObject.months * (-1) : ageObject.months;
    }
    get persianYears(){
        var ageObject = this.getPersianAgeObject();
        return ageObject.reverse ? ageObject.years * (-1) : ageObject.years;
    }
    
    valueOf(){
        var end = this._end;
        if(!(end instanceof Date))end = new Date();
        return Math.floor(end - this._start);
    }
}

module.exports = TimeSpan;