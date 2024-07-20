"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/video/video-player";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { uploadVideoSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldWrapper } from "../wrapper/formfield-wrapper";
import { useMutation } from "@tanstack/react-query";
import { useEdgeStore } from "@/context/edge-store-provider";

function UploadVideoForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const { edgestore } = useEdgeStore();
  const form = useForm<Zod.infer<typeof uploadVideoSchema>>({
    resolver: zodResolver(uploadVideoSchema),
    defaultValues: {
      title: "",
      description: "",
      video: "",
    },
  });

  const { mutate: upload } = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!videoFile) return;
      const abortController = new AbortController();

      const res = await edgestore.publicFiles.upload({
        file: videoFile,
        onProgressChange: (progress) => {
          const isDone = progress === 100;
          const noProgress = progress === 0;
          if (noProgress || isDone) {
            abortController.abort();
          }
        },
        signal: abortController.signal,
      });
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Upload a Video</CardTitle>
        <CardDescription>
          Add a title and description for your video.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={upload} className={"grid gap-2"}>
            <FormFieldWrapper name={"title"} control={form.control} />
            <FormFieldWrapper name={"description"} control={form.control}>
              {(field) => (
                <Textarea
                  {...field}
                  placeholder={"Add your video description here..."}
                />
              )}
            </FormFieldWrapper>
            <FormFieldWrapper name={"video"} control={form.control}>
              {(field) => (
                <Input
                  accept={"video/mp4"}
                  type={"file"}
                  {...field}
                  onChange={(e) => {
                    form.setValue("video", e.target.value);
                    setVideoFile(e.target.files ? e.target.files[0] : null);
                  }}
                />
              )}
            </FormFieldWrapper>
            {videoFile && (
              <div className="rounded-lg overflow-hidden">
                <VideoPlayer src={URL.createObjectURL(videoFile)} />
              </div>
            )}
            <Button type="submit">Upload Video</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { UploadVideoForm };
