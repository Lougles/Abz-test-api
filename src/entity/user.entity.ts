import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContentFile } from './content.file.entity';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;

  @Column({ type: 'uuid', nullable: true, name: 'profile_image_id' })
  profileImageId: string;

  @OneToOne(() => ContentFile, (contentFile: ContentFile) => contentFile.user)
  @JoinColumn({ name: 'profile_image_id' })
  userImg: ContentFile;
}
