export interface TreeNode {
	id: number
	name: string;
	parentId: number;
	expand?: boolean;
}