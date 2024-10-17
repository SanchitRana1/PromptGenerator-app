"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";

const EditPrompt = () => {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({});
	const searchParams = useSearchParams();
	const promptId = searchParams.get("id");

	const updatePrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		if (!promptId) return alert("Prompt Id not found!");
		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag
				})
			});
			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`api/prompt/${promptId}`);
			const { prompt, tag } = await response.json();
			setPost({ prompt, tag });
		};
		if (promptId) getPromptDetails();
	}, [promptId]);

	return <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />;
};

export default EditPrompt;
