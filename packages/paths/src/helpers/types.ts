// Copied from: https://github.com/rveciana/svg-path-properties

export interface Properties {
	getTotalLength(): number;
	getPointAtLength(pos: number): Point;
	getTangentAtLength(pos: number): Point;
	type: 'linear' | 'cubic-bezier' | 'quadratic-bezier' | 'arc';
}

export interface Part {
	start: Point;
	end: Point;
	length: number;
	getPointAtLength(pos: number): Point;
	getTangentAtLength(pos: number): Point;
}
export interface Point {
	x: number;
	y: number;
}
export type PointArray = [number, number];

export type BoundingBox = {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	viewBox: string;
	width: number;
	height: number;
};

export type LInstruction = {
	type: 'L';
	x: number;
	y: number;
};

export type CInstruction = {
	type: 'C';
	cp1x: number;
	cp1y: number;
	cp2x: number;
	cp2y: number;
	x: number;
	y: number;
};

export type MInstruction = {
	type: 'M';
	x: number;
	y: number;
};

export type QInstruction = {
	type: 'Q';
	cpx: number;
	cpy: number;
	x: number;
	y: number;
};

export type ZInstruction = {
	type: 'Z';
};

export type ReducedInstruction =
	| MInstruction
	| LInstruction
	| CInstruction
	| ZInstruction;

export type AbsoluteInstruction =
	| ReducedInstruction
	| QInstruction
	| {
			type: 'A';
			rx: number;
			ry: number;
			xAxisRotation: number;
			largeArcFlag: boolean;
			sweepFlag: boolean;
			x: number;
			y: number;
	  }
	| {
			type: 'S';
			cpx: number;
			cpy: number;
			x: number;
			y: number;
	  }
	| {
			type: 'T';
			x: number;
			y: number;
	  }
	| {
			type: 'H';
			x: number;
	  }
	| {
			type: 'V';
			y: number;
	  };

export type Instruction =
	| AbsoluteInstruction
	| {
			type: 'm';
			dx: number;
			dy: number;
	  }
	| {
			type: 'l';
			dx: number;
			dy: number;
	  }
	| {
			type: 'h';
			dx: number;
	  }
	| {
			type: 'v';
			dy: number;
	  }
	| {
			type: 'c';
			cp1dx: number;
			cp1dy: number;
			cp2dx: number;
			cp2dy: number;
			dx: number;
			dy: number;
	  }
	| {
			type: 's';
			cpdx: number;
			cpdy: number;
			dx: number;
			dy: number;
	  }
	| {
			type: 'q';
			cpdx: number;
			cpdy: number;
			dx: number;
			dy: number;
	  }
	| {
			type: 't';
			dx: number;
			dy: number;
	  }
	| {
			type: 'a';
			rx: number;
			ry: number;
			xAxisRotation: number;
			largeArcFlag: boolean;
			sweepFlag: boolean;
			dx: number;
			dy: number;
	  };
