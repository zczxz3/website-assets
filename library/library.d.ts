export type ButtonEffect = 'fill'|'border'|'magnetic'|'parallax'|'wave'|'blob'|'shine'|'halo'|'roll'|'stagger'|'depth'|'tilt'|'ripple'|'sparks'|'async'|'undo'|'menu'|'goo'|'noise'|'back';
export interface ButtonOptions { effect?:ButtonEffect; label?:string; size?:'sm'|'md'|'lg'; duration?:number; accent?:string; ink?:string; surface?:string; motion?:boolean; disabled?:boolean; onAction?:(context:{signal?:AbortSignal;event?:Event})=>void|Promise<void> }
export interface ButtonInstance {element:HTMLButtonElement;wrapper:HTMLDivElement;setDisabled(value:boolean):void;destroy():void}
export function mountButton(host:HTMLElement,options?:ButtonOptions):ButtonInstance;
export function bindMenu(button:HTMLButtonElement,panel:HTMLElement):{set(open:boolean):void;destroy():void};
export function bindAsync(button:HTMLButtonElement,status:HTMLElement,task:(signal:AbortSignal)=>Promise<unknown>):{run():Promise<void>;cancel():void;readonly phase:'idle'|'loading'|'success'|'error';destroy():void};
export function bindReorder(root:HTMLElement,options:{onMove:(id:string,targetId:string)=>void;onAdd:(id:string,targetId:string)=>void;announce?:(message:string)=>void}):{destroy():void};
