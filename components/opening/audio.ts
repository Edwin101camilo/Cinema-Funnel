export class OpeningAudio {
 private ducked=false;
 private enabled=false;
 context: AudioContext | null = null;
 master: GainNode | null = null;
 async enable(){
  if(!this.context){
   this.context=new AudioContext();this.master=this.context.createGain();this.master.gain.value=0;
   this.master.connect(this.context.destination);
   for(const hz of [48,72]){const o=this.context.createOscillator(),g=this.context.createGain();o.frequency.value=hz;g.gain.value=.035;o.connect(g).connect(this.master);o.start()}
  }
  await this.context.resume();this.enabled=true;this.master!.gain.setTargetAtTime(this.ducked?.12:1,this.context.currentTime,.2);
 }
 duck(active:boolean){this.ducked=active;if(this.context&&this.master&&this.enabled)this.master.gain.setTargetAtTime(active?.12:1,this.context.currentTime,.15)}
 mute(){this.enabled=false;if(this.context&&this.master)this.master.gain.setTargetAtTime(0,this.context.currentTime,.08)}
 cue(hz:number,duration=.4){
  if(!this.context||!this.master)return;
  const c=this.context,o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(hz,c.currentTime);o.frequency.exponentialRampToValueAtTime(hz*.6,c.currentTime+duration);
  g.gain.setValueAtTime(.0001,c.currentTime);g.gain.exponentialRampToValueAtTime(.08,c.currentTime+.02);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+duration);
  o.connect(g).connect(this.master);o.start();o.stop(c.currentTime+duration);o.onended=()=>{o.disconnect();g.disconnect()};
 }
 dispose(){void this.context?.close();this.context=null;this.master=null}
}
