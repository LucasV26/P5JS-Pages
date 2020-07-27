class Triangulo{
    constructor(p1x, p1y, p2x, p2y, p3x, p3y){
      this.p1x = p1x;
      this.p1y = p1y;
      this.p2x = p2x;
      this.p2y = p2y;
      this.p3x = p3x;
      this.p3y = p3y;
      this.a = dist(p1x, p1y, p2x, p2y);
      this.b = dist(p2x, p2y, p3x, p3y);
      this.c = dist(p3x, p3y, p1x, p1y);
    }
  
    Area(){
      let p = (this.a+this.b+this.c)/2;
      let area = Math.sqrt(p * (p-this.a) * (p-this.b) * (p-this.c));
      return Math.round(area);
    }
}
class mouseTriangles{
    constructor(mouseP1, mouseP2, mouseP3){
        this.mouseP1 = mouseP1;
        this.mouseP2 = mouseP2;
        this.mouseP3 = mouseP3;
    }
  
    Areas(a, b, c){
      let p1 = (this.mouseP2+b+this.mouseP3)/2;
      let area1 = Math.sqrt(p1 * (p1-this.mouseP2) * (p1-b) * (p1-this.mouseP3));
      let p2 = (this.mouseP1+this.mouseP3+c)/2;
      let area2 = Math.sqrt(p2 * (p2-this.mouseP1) * (p2-this.mouseP3) * (p2-c));
      let p3 = (a+this.mouseP1+this.mouseP2)/2;
      let area3 = Math.sqrt(p3 * (p3-a) * (p3-this.mouseP1) * (p3-this.mouseP2));
      return Math.round(area1+area2+area3);
    }
}